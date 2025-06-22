import React from 'react';
import useAuthContext from '../Hooks/useAuthContext';
import Loading from '../Featurers/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {loading,user}=useAuthContext();
    const location = useLocation();
    if (loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to={'/'} state={{from:location}} replace  ></Navigate>
    }
    return children
     
};

export default PrivateRoute;