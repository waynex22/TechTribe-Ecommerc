import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/localStorage/token';
import { defaultUser, TypePayload } from '../utils/types/customer';
import { GetInfoUser } from '../services/authApi';
import { useAppDispatch } from '../redux/hook';
import { fetchShop } from '../redux/features/shop';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch()
  const [infoUser, setInfoUser] = useState<TypePayload>(defaultUser);
  const [isLoading, setIsLoading] = useState(true);
  const token = getToken('access_token');

  useEffect(() => {
    const getInfo = async () => {
      if (token) {
        const res = await GetInfoUser();
        setInfoUser(res);
      } else {
        setInfoUser(defaultUser);
      }
      setIsLoading(false);
    };

    getInfo();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder content
  }
  if(infoUser.sub) 
    dispatch(fetchShop())
  return infoUser.role ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;