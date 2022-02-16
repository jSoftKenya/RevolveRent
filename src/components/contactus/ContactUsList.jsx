import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import { useState, useEffect } from 'react';


import baseUrl from "../../utils/common";


// const fetchMessages = () =>{
//    axios.get(
//     `${baseUrl}/contactus/all`
//    ).then((response)=>{
//         console.log(response.data);
//        setInbox(response.data);
//        return;
//     });
//   }

export default function ContactUsList() {


  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    const fetchMessages = () => {
      axios.get(
       `${baseUrl}/contactus/all`
      )
      .then(response => {
        console.log("Fetch users:"+response.data)
        setInbox(response.data);
       return;
      })
      .catch(err => console.log("Fetch user Error:"+err.response));
    };
    fetchMessages([]);
  });



  return (
    <div className="card"> 
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
     
      {inbox.map(m =>{
        return(
          <>
          <ListItem ContactUs="flex-start">
          <ListItemAvatar>
            <Avatar alt={m.name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={m.email}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {m.name}
                </Typography>
                {m.message}
              </React.Fragment>
            }
          />
        </ListItem>
         <Divider variant="inset" component="li" />
         </>
        );
        
      })}
     
     
{/*      
      <Divider variant="inset" component="li" />
      <ListItem ContactUs="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem> */}
    </List>
    </ div>
  );
}
