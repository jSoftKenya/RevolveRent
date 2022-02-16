import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '189363589065-4nigjjf310asbjl85d7pat0b72cvvuhp.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
