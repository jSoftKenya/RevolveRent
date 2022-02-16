import React from 'react';
import axios from 'axios';
import "./contactus.css";
import { Stack, TextField,Button } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import InputAdornment from '@mui/material/InputAdornment';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TitleIcon from '@mui/icons-material/Title';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




import { useHistory } from "react-router-dom";



import {Divider, Typography } from '@mui/material';

import baseUrl from "../../utils/common";
class ContactUs extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      successMessage: '',
      errorMessage: '',
      subject: '',
      history : useHistory() 
    }
  }

  handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST",
      url: baseUrl,
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.onSuccess(response.data.message);
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.");
        this.onError(response.data.message);
      }
    })
  }

  resetForm(){
    this.setState({name: "", email: "", message: "",subject:""})
  }

  render() {
    return(
      <div className="container container-fluid card contactus">

            <div className="row">
                <Button
               variant="outlined"
          
              onPress={this.history.goBack }
              >
                <ArrowBackIcon color="primary"/>
              </Button>   

             </div>

           <div className="row">
            
             <div className="col center">
              <Divider sx={{ my: 3 }}>
                  <Typography variant="h5" sx={{ color: 'green' }}>
                  Fill in the form below to contact us
                  </Typography>
                </Divider> 
              </div>
           </div>

        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <Stack direction="column" sx={{ mt: 3 , my: 1, pd:1}}>

         
          <h2>{this.successMessage && this.successMessage}</h2>
          <span>{this.errorMessage &&  this.errorMessage}</span>


          

                 <TextField
                      id="name"
                      label="Your name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onNameChange.bind(this)}
                      fullWidth
                      variant="outlined"

                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBoxIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
            

                            <TextField
                                          id="subject"
                                          label="Enter Subject"
                                          type="text"
                                          name="subject"
                                          value={this.state.subject}
                                          onChange={this.onNameChange.bind(this)}
                                          fullWidth
                                          variant="outlined"

                                          InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <TitleIcon color="primary" />
                                              </InputAdornment>
                                            ),
                                          }}
                                          variant="standard"
                                        />               

                    <TextField
                                          id="email"
                                          label="Your Email"
                                          type="email"
                                          name="email"
                                          value={this.state.email}
                                          onChange={this.onNameChange.bind(this)}
                                          fullWidth
                                          variant="outlined"

                                          InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <AlternateEmailIcon color="primary" />
                                              </InputAdornment>
                                            ),
                                          }}
                                          variant="standard"
                                        />



              {/* <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} /> */}
          
          {/* <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div> */}

                  <TextareaAutosize
                      fullWidth
                      id="email"
                      minRows={5}
                      placeholder="Type your message here"
                      name="message"
                      value={this.state.message}
                      onChange={this.onMessageChange.bind(this)}
                      fullWidth
                      variant="standard"
                    />

                    
                 <Button type="submit" size="medium" variant="contained" className="send">Send</Button>
          </Stack>
     
        </form>
      </div>
    );
  }

  onNameChange(event) {
	  this.setState({...this.state,name: event.target.value})
  }

  onSubjectChange(event) {
	  this.setState({...this.state,subject: event.target.value})
  }

  onEmailChange(event) {
	  this.setState({...this.state,email: event.target.value})
  }

  onMessageChange(event) {
	  this.setState({...this.state,message: event.target.value})
  }

  onError(error) {
	  this.setState({...this.state,errorMessage:error})
  }
  onSuccess(success) {
	  this.setState({...this.state,successMessage:success})
  }
}

export default ContactUs;