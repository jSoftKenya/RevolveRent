import React, { Component } from "react";
import { Link } from "react-router-dom";

// import BedIcon from '@mui/icons-material/LocalHotel';
// import BathroomIcon from '@mui/icons-material/BathtubOutlined';





//import holderImg from "../../assets/images/2.jpg"
import "./advert.css"

export default class AdvertCard extends Component {
  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  render() {
    const { advert } = this.props;
     const advertImage =
      advert.image ||
      "https://res.cloudinary.com/dpjzmbojz/image/upload/v1585304394/No_image_3x4.svg_dqj5vw.png";

    return (
      <div className="card col-3 mt-3">
        <div className="h-100">
          <img
            className="card-img-top"
            style={{ maxHeight: "30vh", objectFit: "cover" }}
            src={advertImage}
            alt={`${advert.isForRent ? "For rent:" : "For Sale:"} ${
              advert.address
            }, ${advert.city}, ${advert.postcode}`}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title mt-auto">
              {advert.address}, {advert.city}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">{advert.postcode}</h6>
            <p className="card-text price">
              {this.numberWithSpaces(advert.price)}{" "}
              {advert.isForRent ? "Shs./month" : "Shs."}
            </p>
            <Link to={`/advert/${advert.id}`} className="btn btn-info">
              Details
            </Link>
          </div>
        </div>
      </div>

  //     <div className="col-sm-6">
  //     <div className="card">
  //        <div className="row advert-item-container">
  //          <div className="card_filled">
  //            <img 
  //             src= {advertImage}
  //             alt='...'
  //             className="advert-image" />
  //          </div>
           
  //          <div className="card-body info_div">
  //              <div className="title">Orchid House</div>
  //              <div className="price">Ksh 25,000 P/M</div>

  //              <div className="footer">
  //                <div className="text-muted">
  //                <BedIcon/><small> 4 bedrooms</small>
  //                </div>
  //                <div className="text-muted">
  //                <BathroomIcon/><small> 2 Bathrooms</small>
  //                </div>
  //              </div>
  //          </div>
  //        </div>

  //     </div>

  //  </div>
    );
  }
}
