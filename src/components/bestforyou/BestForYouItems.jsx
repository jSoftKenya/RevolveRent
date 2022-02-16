import React from 'react'

import BestForYouItem from '../mainpage/BestForYouItem';
import "./bestforyouitems.css"
// import { NearbyTitle } from '../nearby/components';

const BestforYouItems = props =>{
    return (
      <>
      <div className="recommended col-12"> 
      <h4>Best for you</h4>   
       <div className="row">
          {[0,1,2,3,5,6].map((advert, i) => (
         
           <BestForYouItem advert={advert} key={i}  style={{  maxHeight: '120px' }}/>
          ))}
        </div>
     </div>

    </>
    );
}

export default BestforYouItems