
import React from 'react';
import { useGoogleLogin } from 'react-google-login';

import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import { Stack, Button, Divider, Typography } from '@mui/material';

// refresh token
import { refreshTokenSetup } from './utils/refreshToken';

const clientId =
  '189363589065-4nigjjf310asbjl85d7pat0b72cvvuhp.apps.googleusercontent.com';

function LoginHooks() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    //console.log('Login failed: res:', res);
    console.log(
      `Failed to login. Please consult tech@revolverent.com for support`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <div className="col-12 text-center">
    {/* <button onClick={signIn} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>
      <span className="buttonText">Sign in with Google</span>
    </button> */}
    {/* <img src="icons/google.svg" alt="google login" className="icon"></img>


    <Button variant="outlined" onClick={signIn}>
    Sign in with Google
    </Button> */}
        
   

    <Button fullWidth size="large"  variant="outlined"  onClick={signIn}>
          <Icon icon={googleFill} color="#DF3E30" height={24} />
          Sign in with Google
    </Button>
    </div>
  );
}

export default LoginHooks;
