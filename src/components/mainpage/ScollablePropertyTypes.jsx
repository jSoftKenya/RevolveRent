import ReactDOM from "react-dom";
import React, { createRef, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAdverts } from "../../actions/advert";

import ScrollContainer from "react-indiana-drag-scroll";
import { Stack, Button, Divider, Typography } from '@mui/material';
import "./propertytypes.css";

const numbers = new Array(20).fill(1).map((_, index) => index + 1);

const clickHandler = () => {
 // alert("clicked!");
};

const ScrollablePropertyTypes = (props) => {
  
    const  propertyTypes = props.propertyTypes;

    const scrollRef = createRef();

  /*
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  });
  */

  const enableKeyboardCursorToScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  };

  return (
    <>  
    < div className="property_container">
     <Stack direction="row" alignItems="center" justifyContent="space-around" >
        <Typography variant="subtitle" sx={{ color: 'green' }}>
            Drag to View more property types
        </Typography>
     </Stack>
     
      <ScrollContainer className="property_container">
        <section
          className="tiles"
          onFocus={enableKeyboardCursorToScroll}
          ref={scrollRef}
        >
          {propertyTypes.map((p) => (
        

            <div
               key={p.id} 
              className="property_row"
              style={{ width: 200 }}
              onClick={clickHandler}
            >
              <div
                className="property_row"
                style={{
                  width: 200,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
            <Button size="small" variant="contained" onClick={clickHandler}   key={p.name} >
                    {/* <Icon icon={googleFill} color="#DF3E30" height={24} />{p.name} */}
                    {p.name}
             </Button>
              </div>
            </div>
          ))}
        </section>
      </ScrollContainer>
    </div>
    
 </>
  );
};

function mapStateToProps(state) {
  return {
    allAdverts: state.advertReducer.allAdverts,
    advertsCount: state.advertReducer.advertsCount,
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { fetchAdverts })(ScrollablePropertyTypes);
// export default ScrollablePropertyTypes