import * as React from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";
import baseUrl from "../utils/common";

import "./confirmdialog.css";

  import {
    Link,
    Typography,
    Button,
    Stack,
    Checkbox,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Divider
  } from '@mui/material';
  import { LoadingButton } from '@mui/lab';

const initPayRentData = {
  phone : "",
  amount : 0,
  month : 1,
  year : 2022,
  userId: -1,
  advertId: -1
}


export default function MpesaConfirmDialog(props) {
  const {userId, advertId,phone,amount} = props;
  
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("Mpesa");


  

  const handleClickOpen = (action) => {
    setAction(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAccept = () =>{
    payRent({
      userId : userId,
      amount: amount,
      advertId:advertId
    });
    setOpen(false);
  }


 const payRent = (data) =>{
    console.log("Paying rent for:"+this.props.user.id);
    const userId = this.props.user.id;
    axios
    .get(`${baseUrl}/rentrequest/myrequests/${userId}`)
    .then(res => {
      console.log("Rent Requests data:"+JSON.stringify(res.data));
      this.setState({ ...this.state, myRentRequests: res.data});
    })
    .catch(err => {
      console.log("RentRequests Error:"+JSON.stringify(err));

    });
  }

  return (
    <div className="row">
      {/* <div className="forgot_password">
          <div className="forgot_label">Forgot Password?</div>
            <Button variant="outlined" onClick={handleClickOpen}>
            Reset Password
            </Button>
      </div>   */}

     <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
          {/* <FormControlLabel
            // control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}

          {/* <Link component={RouterLink} variant="subtitle2" to="#" onClick={handleClickOpen}>
            Mpesa Pay
          </Link> */}



          <Button
            fullWidth
            size="small"
            type="button"
            variant="contained"
            onClick={handleClickOpen}
            >
            Mpesa
          </Button>
          <Button
            fullWidth
            size="small"
            type="button"
            variant="outlined"
            className="paypal"
            >
            Paypal
          </Button>

          <Button
            fullWidth
            size="small"
            type="button"
            variant="outlined"
            className="reschedude"
            >
            Reschedule
          </Button>

           
        </Stack>
{/*   
      <Stack direction="row" spacing={2}>
      <h4>Forgot Password?</h4>
          
            <Link to="#" underline="none" variant="subtitle2" component={RouterLink} onClick={handleClickOpen}>
            Reset Password
        </Link>
    
    </Stack> */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pay your Rent</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Confirm the Mpesa Account details and click send
          </DialogContentText>
          <TextField
            margin="dense"
            id="phone"
            label="Mpesa Phone"
            type="text"
            value={props.phone}
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            value={amount}
            fullWidth
            variant="standard"
          />
         
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAccept}>Send Request</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
