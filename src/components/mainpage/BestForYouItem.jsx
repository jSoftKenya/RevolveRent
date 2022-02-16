import React, { Component } from 'react'
import BedIcon from '@material-ui/icons/SingleBed'
import BathroomIcon from '@material-ui/icons/Bathtub'
import "./bestforyou.css"

import holderImg from "../../assets/images/3.jpg"

export default class BestForYouItem extends Component {
  rnumberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  render() {
    const { advert } = this.props;
    const advertImage = advert.image ||holderImg;

    return (
 
    <div className="best_item col-sm-12 col-md-6">
       <div className="card">
          <div className="wrapper"> 
              <div className="image_wapper">
                <img 
                src= {advertImage}
                alt='...'
                className="__image" />
               </div> 
               <div className="card-body">
                <div className=" __content">
                  <h2 className="card_title text-dark">Orchid House</h2>
                  <div className="price">Ksh 25,000 P/Month</div>

                  <div className="footer">
                    <div className="text-muted">
                    <BedIcon/><small> 4 bedrooms</small>
                    </div>
                    <div className="text-muted">
                    <BathroomIcon/><small> 2 Bathrooms</small>
                    </div>
                  </div>
                  </div>
            </div>
          </div>

       </div>

    </div>


  );
}
}
