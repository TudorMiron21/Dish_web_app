import { useState } from "react";

import { Home } from "../pages/home";
export const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const HoleCarouselStyle = {
    height: "100%",
    position: "relative",
  };
  const carouselStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`,
    transition: "0.5s",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "45%",
    transform: "translate(0,-50%)",
    left: "32px",
    fontSize: "45px",
    color: "#000",
    zIndex: 1,
    cursor: "pointer",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "45%",
    transform: "translate(0,-50%)",
    right: "32px",
    fontSize: "45px",
    color: "#000",
    zIndex: 1,
    cursor: "pointer",
  };

  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",

  };

  const dotStyles = {
    margin: "10px",
    cursor: "pointer",
    fontSize: "20px",
    marginBottom: "10px",
  };

  const carouselTextStyle ={
    fontSize:"45px",
    marginLeft:"15px",
    }

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div style={HoleCarouselStyle}>
      <div style={leftArrowStyles} onClick={goToPrev}>
        {" "}
        ⇦{" "}
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        {" "}
        ⇨{" "}
      </div>

      <div style={carouselStyle}>
        <p style ={carouselTextStyle}>{slides[currentIndex].title}</p>
      </div>

      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            style={dotStyles}
            onClick={() => goToSlide(slideIndex)}
          >
            🔘
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
