import styled from "styled-components";

export const NEXT = "NEXT";
export const PREV = "PREV";

export const Item = styled.div`
  text-align: center;
  padding: 100px;
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
`;

export const CarouselContainer = styled.div`
  display: flex !important;
  transition: ${(props) => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${(props) => {
    if (!props.sliding) return "translateX(calc(-80% - 20px))";
    if (props.dir === PREV) return "translateX(calc(2 * (-80% - 20px)))";
    return "translateX(0%)";
  }};
`;

export const Wrapper = styled.div`
  width: 100% !important;
  overflow: hidden !important;
  border-radius: 5px;
  background-color: var(--second-color-blue) !important;
`;

export const CarouselSlot = styled.div`
  flex: 1 0 100%;
  flex-basis: 80%;
  margin-right: .25rem;
  order: ${(props) => props.order};
`;

export const SlideButton = styled.button`
    color: var(--txt-color-blue) ;
    font-family: Open Sans;
    font-size: 16px;
    font-weight: 100;
    padding: 10px;
    background-color: none;
    border: 1px solid white;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    margin-top: 20px;
    text-decoration: none;
    text-color: blue;
    float: ${(props) => props.float};

  &:active {
    position: relative;
    top: 1px;
  }
  &:focus {
    outline: 0;
  }
`;


export const NearbyTitle = styled.h1`
    color: #000000;
    font-family: Open Sans;
    font-weight: 700;
    font-size: 25px;
    padding: 10px;
    border: 1px solid white;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    margin-top: 20px;
    text-decoration: none;
    text-color: blue;
    float: ${(props) => props.float};

  &:active {
    position: relative;
    top: 1px;
  }
  &:focus {
    outline: 0;
  }
`;

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: 75%;
  height: 1000px;
`;

export const Code = styled.code`
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  margin: 0;
  padding: 0.2em 0.4em;
`;

export const CarouselTitle = styled.div`
  display:flex;
  flex-direction:row;
  color: #000000;
  font-weight: 700;
  font-size: 1.6rem;
  cursor: pointer;
`;