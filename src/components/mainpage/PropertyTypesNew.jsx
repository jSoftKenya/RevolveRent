import ReactDOM from "react-dom";
import React, { createRef, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "./propertytypes.css";

const numbers = new Array(20).fill(1).map((_, index) => index + 1);

const clickHandler = () => {
  alert("clicked!");
};

const PropertyTypesNew = () => {
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
    <div>
      <img
        src="gold.jpg"
        width="300px"
        alt="indiana jones contemplates swiping the statue"
      />
      <h1>Drag with Scrollbars using React Indiana Drag Scroll</h1>
      <ScrollContainer className="container">
        <section
          className="tiles"
          onFocus={enableKeyboardCursorToScroll}
          ref={scrollRef}
        >
          {numbers.map((el) => (
            <div
              key={el}
              className="row"
              style={{ width: 200 }}
              onClick={clickHandler}
            >
              <div
                style={{
                  width: 200,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {el}
              </div>
            </div>
          ))}
        </section>
      </ScrollContainer>
    </div>
  );
};


export default PropertyTypesNew