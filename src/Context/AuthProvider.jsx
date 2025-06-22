import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
    const [loading,setLoading]=useState(true);
    const  userdata = {
       loading,
    };
    return (
      
     
         <AuthContext value={userdata} >
            {children}
         </AuthContext>
      
    );
};

export default AuthProvider;