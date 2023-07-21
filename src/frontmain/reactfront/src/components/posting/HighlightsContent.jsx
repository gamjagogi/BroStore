import React, {useState} from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLength20, minLength8 } from "../../helpers/validation";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { ReactComponent as IconApp } from "bootstrap-icons/icons/app.svg";
import AddTextBox from "../others/AddTextBox";
import CreateList from "../others/CreateList";


const HighlightsContent = (props) => {
  const { handleSubmit, highlightData, onSubmit, submitFailed } = props;




  return (
    <div className="card border-info">
      <h6 className="card-header bg-info text-white">
        <IconApp /> Highlight Contents
      </h6>
      <div className="card-body" style={{marginTop: '-50px'}}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
          noValidate
        >
            <CreateList

            />
        </form>

      </div>
    </div>
  );
};

export default compose(
  reduxForm({
    form: "changepassword",
  })
)(HighlightsContent);
