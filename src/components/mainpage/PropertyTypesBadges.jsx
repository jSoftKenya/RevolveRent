import React, { Component, Fragment } from "react";

import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';


const DEFAULT_TYPES = [
 "Villa",
 "Apartment",
 "Conference",
 "Hotel",
 "House",
 "Business"
];

const PropertyTypesBadges = (props) => {
  // let [btn, ...others] = propertyTypes;

  const  propertyTypes = props.propertyTypes;

  // if(props.propertyTypes){
  //    types = props.propertyTypes.length > 0 ? props.propertyTypes.length : DEFAULT_TYPES;
  // }
  

  return (  
         <>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                {
                    propertyTypes.map((p,id) =>(
                      // <button
                      //     type="button"
                      //     className="btn btn-sm btn-outline-info ml-2 mt-1"
                      //     key={id}
                      //   >
                      //     {p}
                      //   </button>
                        
                        <Button size="small" variant="outlined" key={id}>
                          {/* <Icon icon={googleFill} color="#DF3E30" height={24} />{p.name} */}
                          {p.name}
                        </Button>
                    
                    ))
                }
             </Stack>
            
            </>
    );
}

export default PropertyTypesBadges;