
import React from 'react';


import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';

// ----------------------------------------------------------------------
// import LoginHooks from "../google-login/LoginHooks";
import LoginHooks from "../../components/google-login/LoginHooks";

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
      
        <LoginHooks/>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
