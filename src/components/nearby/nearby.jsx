import React from "react";
import ReactDOM from "react-dom";
import { Item, AppContainer, Code } from "./components";
import Carousel from "./Carousel";
import NearbyItem from "../mainpage/NearbyItem";

import "./nearby.css";


import img1 from "../../assets/images/1.jpg"
import img2 from "../../assets/images/2.jpg"
import img3 from "../../assets/images/3.jpg"
import img4 from "../../assets/images/4.jpg"
import img5 from "../../assets/images/5.jpg"
import img6 from "../../assets/images/6.jpg"
import img7 from "../../assets/images/7.jpg"

// CREDITS for Carousel:
// https://medium.com/@incubation.ff/build-your-own-css-carousel-in-react-part-one-86f71f6670ca

function NearbyItems() {
  return (
    <>
     
      <Carousel title="Carousel" numItems="3">
        {/* <Item img="https://unsplash.it/475/205" />
        <Item img="https://unsplash.it/476/205" />
        <Item img="https://unsplash.it/477/205" />
       <Item img="https://unsplash.it/478/205" />
        <Item img="https://unsplash.it/479/205" /> */}
        <NearbyItem img={img1} />
        <NearbyItem img={img2}  />
        <NearbyItem img={img3}  />
        <NearbyItem img={img4}  />
        <NearbyItem img={img5}  />
        <NearbyItem img={img6}  />
        <NearbyItem img={img7} />
    
      </Carousel>

    </>
  );
}

export default NearbyItems
