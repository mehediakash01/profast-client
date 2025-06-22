import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const useAuthContext = () => {
    const authINfo = useContext(AuthContext);
    return authINfo;
};

export default useAuthContext;