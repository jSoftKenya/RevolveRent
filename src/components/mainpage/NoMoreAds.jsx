
import React from 'react';
import { Stack, Button, Divider, Typography } from '@mui/material';

const NoMoreAds = (props) => {
    return ( 
        
      
          <Divider sx={{ my: 3 }}>
            <Typography variant="h4" sx={{ color: 'text.secondary' }}>
               {props.message}
            </Typography>
            </Divider>

     );
}
 
export default NoMoreAds;