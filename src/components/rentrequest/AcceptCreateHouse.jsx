import * as React from 'react';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";
import baseUrl from "../../utils/common";


  import {
    Link,
    Typography,
    Button,
    Stack,
    Checkbox,
    InputAdornment,
    FormControlLabel,
    Divider
  } from '@mui/material';
  import { LoadingButton } from '@mui/lab';




export default function AcceptCreateHouse(props) {

  
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("Mpesa");

  const [userId, setUserId] = React.useState(props.advertId);
  const [advertId, setAdvertId] = React.useState(props.advertId);
  const [monthlyRent, setMonthlyRent] = React.useState(props.monthlyRent);
  const [initialDeposit, setInitialDeposit] = React.useState(props.initialDeposit);
  const [otherCharges, setOtherCharges] = React.useState(props.otherCharges);
  const [payDate, setPaydate] = React.useState(1);


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
      advertId:advertId,
      monthlyRent: monthlyRent,
      initialDeposit: initialDeposit,
      otherCharges: otherCharges,
      payDate: payDate,
      rentRequestId: 1
    });
    setOpen(false);
  }


  const handleRentChange = e => {
    e.preventDefault();
    setMonthlyRent( e.target.value);
  };

  const  handleDepositChange = e => {
    e.preventDefault();
    setInitialDeposit( e.target.value);
  };

  const  handleChargesChange = e => {
    e.preventDefault();
    setOtherCharges( e.target.value);
  };

  const handlePayDateChange = e => {
    e.preventDefault();
    setPaydate( e.target.value);
  };


 const payRent = (data) =>{
    console.log("Accepting request for:"+userId);
   
    axios
    .post(`${baseUrl}/rentrequest/accept`,
     {
       ...data
      }
    )
    .then(res => {
      console.log("Rent Requests Accept data:"+JSON.stringify(res.data));
    })
    .catch(err => {
      console.log("RentRequests Accept Error:"+JSON.stringify(err));

    });
  }

  
  return (
    <div className="row">
    
      <ListItemText primary="Accept" primaryTypographyProps={{ variant: 'body2' }}  onClick={handleClickOpen}/>
      
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Accept User Request to Rent</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Accept this rent request. The tenant will receive details in order to start rent payments...
          </DialogContentText>
          <TextField
            margin="dense"
            id="userId"
            label="Tenant Name"
            type="text"
            value={userId}
            fullWidth
            variant="standard"

            disabled
          />
           <TextField
            autoFocus
            margin="dense"
            id="advertId"
            label="Advet"
            type="number"
            value={advertId}
            fullWidth
            variant="standard"
            disabled
          />

       <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
        <TextField
            autoFocus
            margin="dense"
            id="monthlyRent"
            label="Monthly Rent Amount"
            type="number"
            value={monthlyRent}
            onChange={e => handleRentChange(e)}
            variant="standard"
          />

      <TextField
            margin="dense"
            id="initialDeposit"
            label="Initial Deposit"
            type="number"
            value={initialDeposit}
            onChange={e => handleDepositChange(e)}
            variant="standard"
          />

     <TextField
            margin="dense"
            id="otherCharges"
            label="Other Charges"
            type="number"
            value={otherCharges}
            onChange={e => handleChargesChange(e)}
            variant="standard"
          />

       <TextField
            margin="dense"
            id="payDate"
            label="Rent Payment Date"
            type="text"
            value={payDate}
            onChange={e => handlePayDateChange(e)}
            variant="standard"
          />     
         
        </Stack>   
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAccept}>Accept</Button>
        </DialogActions>
       </Dialog>
    </div>
  );
}
