import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import NotFoundGif from '../assets/404.gif';

function NotFoundPage() {
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRedirectCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <Container
        maxWidth="xl"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'monospace',
            fontSize: '1.5rem',
        }}
    >
        <img src={NotFoundGif} alt="404 - Page Not Found" style={{ width: '70%', height: 'auto' }} />
        <p>La page que vous recherchez n'a pas été trouvée. Vous serez redirigé vers la page d'accueil dans {redirectCountdown} {redirectCountdown === 1 ? 'seconde...' : 'secondes...'} </p>
        <p>Si la redirection ne fonctionne pas, <a href="/">cliquez ici</a> pour revenir à la page d'accueil.</p>
    </Container>
  );
}

export default NotFoundPage;
