import React from 'react'
import "./nearbyitem.css"

import {MDBBadge,  MDBCard, MDBCardTitle, MDBCardText, MDBCardOverlay, MDBCardImage, MDBCol } from 'mdb-react-ui-kit';

const NearbyItem = props =>{
    return (
    <MDBCol style={{ minHeight: '220px', marginTop: '10px' }}>
    <MDBCard style={{ minHeight: '220px' }} className="card_filled text-white">    
      <MDBCardImage overlay src={props.img} alt='...' className="block-image"/>
      <MDBCardOverlay>
        <MDBBadge pill className='mx-2 distance' color='info'>
          12 Km.
        </MDBBadge>
        <MDBCardTitle className='title'>Elgon View Apartments</MDBCardTitle>
  
        <MDBCardText className='description'>Home away from home</MDBCardText>
      </MDBCardOverlay>
    </MDBCard>
    </MDBCol> 
    );
}

export default NearbyItem