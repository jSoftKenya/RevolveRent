import { Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

import {useHistory} from "react-router-dom";

import './statuscard.css';

import {
  Button,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const StatusCard = props => {
    
  
  let history = useHistory();
   
  const redirect= (to)=>{
     if(to){
        history.push(to);
     }

  }

  
  return (
        <div className='status-card'>
            
            <div className="status-card__info">
                <h4>{props.count}</h4>

                <Typography className="blue_title">
                      {props.title}
                 </Typography>


                 <Button component={Link} to={props.to ? props.to : "#" }>Details</Button>
             
            </div>
    

            {/* <div className="input-group">
                
                    <div className="input-group-prepend">
                      <span className="input-group-text">Ksh.</span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      name="amountInEUR"
                      placeholder=""
                      min="1"
                      max="100000"
                      step="1"
                      //value={this.state.amountInEUR}
                     // onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00</span>
                    </div>
            </div> */}
         
        </div>

        
    );
}

export default StatusCard
