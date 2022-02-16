import * as React from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';


  import {
    Link,
    Button,
    Stack,
    Checkbox,
    IconButton,
    InputAdornment,
    FormControlLabel
  } from '@mui/material';
  import { LoadingButton } from '@mui/lab';


export default function DialogWrapper( props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleClickOpen([]);
  });

  return (
    <div>
      {/* <div className="forgot_password">
          <div className="forgot_label">Forgot Password?</div>
            <Button variant="outlined" onClick={handleClickOpen}>
            Reset Password
            </Button>
      </div>   */}

     <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ my: 1 }}>
          {/* <FormControlLabel
            // control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}
{/* 
          <Link component={RouterLink} variant="subtitle2" to="#" onClick={handleClickOpen}>
            Forgot password?
          </Link> */}
        </Stack>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Proceed here..</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To reset your password, please enter your registered email address here. We
            will send you the reset instructions if the email exists...
          </DialogContentText> */}
          {props.content}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
