import React from 'react'

import './rentcard.css';

import {useHistory} from "react-router-dom";

import { connect } from "react-redux";


import { logMeOut } from "../../actions/user";

// material
import {
    Link,
    Stack,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel
  } from '@mui/material';
  import { LoadingButton } from '@mui/lab';


import { Button, Divider, Typography } from '@mui/material';
import MpesaConfirmDialog from '../../utils/MpesaConfirmDialog';





const RentCard = props => {
  
   const payDetails = {
      userId: props.user.id,
      advertId: props.advertId,
      phone : props.user.phone,
      amount : props.amount
   };
   
   

    return (
        <div className='rent-card'>
              <Stack direction="column" alignItems="center" justifyContent="space-between">
                    <div className="rent-card__icon">
                        <i className={props.icon}></i>
                    </div>
                    <div className="rent-card__info">
                        <h4>{props.amount}</h4>
                        <span>{props.title}</span>
                    </div>
             </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle3" sx={{ color: 'text.primary' }}>
                   Houses {0}
                </Typography>
                <Typography variant="subtitle3" sx={{ color: 'text.primary' }}>
                   Accepted Requests {0}/ {0}
                </Typography>

                <Typography variant="subtitle3" sx={{ color: 'text.primary' }}>
                   Pay Date {"5th"}  ("7 days left")
                </Typography>

             </Stack>

             {/* <Stack direction="row" alignItems="center" justifyContent="space-between"> */}
                 
                 {/* <Button
                    fullWidth
                    size="small"
                    type="button"
                    variant="contained"
                    
                    >
                    Pay
                 </Button> */}
                 <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                     Pay with
                  </Typography>
                  </Divider>

                 <MpesaConfirmDialog {...payDetails} />
                 {/* <Button
                    fullWidth
                    size="small"
                    type="button"
                    variant="outlined"
                    >
                    Reschedule
                 </Button> */}
            {/* </Stack> */}
     </div>
    )
}
function mapStateToProps(state) {
   return {
     user: state.userReducer
   };
 }
 
export default connect(mapStateToProps, { logMeOut })(RentCard);

