import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import {
  required,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
  email,
} from "../../helpers/validation";

import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";

const FrontContent = (props) => {
  const {
    onImageChange,
    imagePreview,
  } = props;



  return (
      <div className="card border-primary">
        <h6 className="card-header">
          <IconPersonSquareFill /> Thumbnail
        </h6>
        <img
          src={imagePreview ? imagePreview : "../../images/NO_IMG.png"}
          alt=""
          className="card-img-top rounded-0 img-fluid bg-secondary"
        />
        <div className="card-body">
          <Field
            name="formFile"
            component={renderFormFileInput}
            onImageChange={onImageChange}
            validate={[required]}
            tips="You don't allow uploading a photo more than 5MB"
          />
        </div>
      </div>
  );
};

export default compose(
  reduxForm({
    form: "profile",
  })
)(FrontContent);
