import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import getUserData from '../utils/getUserData';
import { getAuth } from 'firebase/auth';

export default function AdminView() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [authorized, setAuthorized] = useState(false);
  const userConnected = cookies.user;
  const auth = getAuth();

  useEffect(() => {
    getUserData(auth.currentUser).then((userData) => {
      if (userData.admin === true) {
        setAuthorized(true);
      } else {
        navigate('/');
      }
    });
  }, [auth]);
  return (
    <Container>
      {authorized && (
        <div>
          <h1>Admin View</h1>
          <p>Here you can manage your app</p>
        </div>
      )}
    </Container>
  )
}
