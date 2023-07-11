import React from "react";

const Details = (props) => {
    console.log(props.desc);

  return (
    <React.Fragment>
      <p>
          {props.desc}
      </p>
    </React.Fragment>
  );
};

export default Details;
