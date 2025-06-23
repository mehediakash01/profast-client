import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Featurers/Firebase/Firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  // Create User

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   continue with the google
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  //   signoutUser

  const Logout = () => {
    return signOut(auth)
      .then(() => {
        toast.success("Successfully signout!");
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };

  //   Update user
  const UpdateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  // Set an observer who will manage user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  //  authData
  const userdata = {
    loading,
    createUser,
    loginUser,
    user,
    setUser,
    googleLogin,
    Logout,
    UpdateUser,
  };
  return <AuthContext value={userdata}>{children}</AuthContext>;
};

export default AuthProvider;
