import React, { Component } from "react";
import axios from "axios";

import {
  Button,
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import HouseTypesList from "./HouseTypesList";



let baseUrl = "";
// if (process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:4000";
// } else {
//   baseUrl = "https://shielded-journey-92023.herokuapp.com";
// }


const initialState = {
  newType: "",
  selectedAdvert: {},
  propertyTypes: [{}]
};




let name= "";


class HouseType extends Component {
  state = initialState;

  componentDidMount() {
    
    this.fetchPropertyTypes();
  }

  fetchPropertyTypes = () => {
    axios
    .get(`${baseUrl}/type/all`)
    .then(res => {
      console.log("Propertytypes data:"+JSON.stringify(res.data));
      this.setState({ propertyTypes: res.data});
    })
    .catch(err => {
      console.log("Propertytypes Error:"+JSON.stringify(err));

    });
  };


    saveHouseType = (e) =>{
        axios
        .post(`${baseUrl}/types/create/name`,
          {
           name : this.newType
          }
        )
        .then(res => {
          alert(res.data);
        })
        .catch(err => console.log(err));
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
           newType : e.target.value
        });    
      
    };


 render(){ 
  return ( 
        <div className="card col-6">

            <form onSubmit={this.saveHouseType}> 
                
            
                  {/* <label htmlFor="name">House Type</label>
                  <input 
                  type="text" 
                  id="name" 
                  name="name"
                  onChange={handleChange}
                  ></input> */}

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              <TextField
                  fullWidth
                  autoComplete="username"
                  text="name"
                  onChange={this.handleChange}
                  label="Type title"
                  // {...getFieldProps('name')}
                  // error={Boolean(touched.email && errors.name)}
                  // helperText={touched.name && errors.name}
               />
                
                <Button
                  type="submit"
                  varriant="contained"
                  >
                  Save
                  </Button>
                </Stack>
            
            </form>

            
        </div>
        

    );
  }
}
 
export default HouseType;