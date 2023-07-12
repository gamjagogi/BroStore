import React, { lazy, Component } from "react";
import FrontContent from "../../components/posting/FrontContent";
import HighlightsContent from "../../components/posting/HighlightsContent";
const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() =>
  import("../../components/account/ChangePasswordForm")
);
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() =>
  import("../../components/account/CardListForm")
);

class MyProfileView extends Component {
  state = { imagePreview: "", isDeleting: false };


  onSubmitChangePassword = async (values) => {
    alert(JSON.stringify(values));
  };

  onImageChange = async (obj) => {
    if (obj) {
      const val = await this.getBase64(obj);
      this.setState({ imagePreview: val });
    } else {
      this.setState({ imagePreview: "" });
    }
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };
  render() {
    return (
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-4">
            <FrontContent
              onImageChange={this.onImageChange}
              imagePreview={this.state.imagePreview}
            />
          </div>
          <div className="col-md-8">
            <HighlightsContent onSubmit={this.onSubmitChangePassword} />
            <br></br>
            <SettingForm />
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default MyProfileView;
