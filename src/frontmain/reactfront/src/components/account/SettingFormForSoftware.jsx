import React, { useState } from "react";
import { ReactComponent as IconGearFill } from "bootstrap-icons/icons/gear-fill.svg";
import { ReactComponent as IconPercent } from "bootstrap-icons/icons/percent.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconBell } from "bootstrap-icons/icons/bell.svg";

const SettingForm = (props) => {
  const {
      onDeliveryToggle,
      onNewTagToggle,
      onHotTagToggle,
      deliveryEnabled,
      newTagEnabled,
      hotTagEnabled
  } = props;



    const handleDeliveryToggle = () => {
        onDeliveryToggle(!deliveryEnabled);
    }

    const handleNewToggle = () => {
        onNewTagToggle(!newTagEnabled);
    }

    const handleHotToggle = () => {
        onHotTagToggle(!hotTagEnabled);
    }



    return (
      <div className="card border-danger">
        <h6 className="card-header">
          <IconGearFill className="text-danger" /> Setting
        </h6>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <IconBell /> Free Delivery
            <div className="form-check form-switch float-end">
              <input
                  className="form-check-input"
                  type="checkbox"
                  checked={deliveryEnabled}
                  onChange={handleDeliveryToggle}
                  disabled
              />
            </div>
          </li>
          <li className="list-group-item">
            <IconEnvelope /> New Tag
            <div className="form-check form-switch float-end">
              <input
                  className="form-check-input"
                  type="checkbox"
                  checked={newTagEnabled}
                  onChange={handleNewToggle}
              />
            </div>
          </li>
          <li className="list-group-item">
            <IconPercent /> Hot Tag
            <div className="form-check form-switch float-end">
              <input
                  className="form-check-input"
                  type="checkbox"
                  checked={hotTagEnabled}
                  onChange={handleHotToggle}
              />
            </div>
          </li>
        </ul>
      </div>
  );
};

export default SettingForm;
