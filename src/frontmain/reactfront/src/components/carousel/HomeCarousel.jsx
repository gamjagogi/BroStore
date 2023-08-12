import React from "react";

const HomeCarousel = (props) => {
  return (
    <div id={props.id} data-bs-ride="carousel">
      <a
        className="carousel-control-prev text-dark"
        href={"#" + props.id}
        role="button"
        data-bs-slide="prev"
        style={{ left: "-40px" }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next text-dark"
        href={"#" + props.id}
        role="button"
        data-bs-slide="next"
        style={{ right: "-10px" }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default HomeCarousel;
