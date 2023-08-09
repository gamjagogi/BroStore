import React from "react";
import { ReactComponent as IconCash } from "bootstrap-icons/icons/cash.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconMegaphone } from "bootstrap-icons/icons/megaphone.svg";
const Support = (props) => {
  return (
    <div className={`row g-3 ${props.className}`}>
      <div className="col-md-4">
        <div className="card bg-primary">
          <div className="card-body text-white">
            <span className="p-3 bg-light rounded-circle me-3 text-dark">
              <IconMegaphone width={40} height={40} />
            </span>
            <a href="./Notice"  style={{color : "white", fontSize:'25px'}}> Notice </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-danger" style={{fontWeight:'bold'}}>
          <div className="card-body text-white">
            <span className="p-3 bg-light rounded-circle me-3 text-dark">
              <IconHeadset width={40} height={40} />
            </span>
            Manager kakao : gamja123
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card bg-success">
          <div className="card-body text-white">
            <span className="p-3 bg-light rounded-circle me-3 text-dark">
              <IconTruck width={40} height={40} />
            </span>
            Quick delivery
          </div>
        </div>
      </div>
    </div>
  );
};
export default Support;
