(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_account_ForgotPasswordForm_jsx"],{

/***/ "./node_modules/bootstrap-icons/icons/phone.svg":
/*!******************************************************!*\
  !*** ./node_modules/bootstrap-icons/icons/phone.svg ***!
  \******************************************************/
/***/ (function() {

/*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-phone",
  viewBox: "0 0 16 16"
}, /*#__PURE__*/React.createElement("path", {
  d: "M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
}));

/***/ }),

/***/ "./src/components/account/ForgotPasswordForm.jsx":
/*!*******************************************************!*\
  !*** ./src/components/account/ForgotPasswordForm.jsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/Field.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/reduxForm.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/renderFormGroupField */ "./src/helpers/renderFormGroupField.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/validation */ "./src/helpers/validation.js");
/* harmony import */ var bootstrap_icons_icons_phone_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap-icons/icons/phone.svg */ "./node_modules/bootstrap-icons/icons/phone.svg");
/* harmony import */ var bootstrap_icons_icons_phone_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_phone_svg__WEBPACK_IMPORTED_MODULE_3__);







var ForgotPasswordForm = function ForgotPasswordForm(props) {
  var handleSubmit = props.handleSubmit,
    submitting = props.submitting,
    onSubmit = props.onSubmit,
    submitFailed = props.submitFailed;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit),
    className: "needs-validation ".concat(submitFailed ? "was-validated" : ""),
    noValidate: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_4__["default"], {
    name: "mobileNo",
    type: "number",
    label: "Mobile no",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "Mobile no without country code",
    icon: bootstrap_icons_icons_phone_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.required, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.maxLengthMobileNo, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.minLengthMobileNo, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.digit],
    required: true,
    max: "999999999999999",
    min: "9999",
    className: "mb-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "d-grid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    className: "btn btn-primary mb-3",
    disabled: submitting
  }, "Submit")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
    className: "float-start",
    to: "/account/signup",
    title: "Sign Up"
  }, "Create your account"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link, {
    className: "float-end",
    to: "/account/signin",
    title: "Sign In"
  }, "Sign In"));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,redux__WEBPACK_IMPORTED_MODULE_6__.compose)((0,redux_form__WEBPACK_IMPORTED_MODULE_7__["default"])({
  form: "forgotpassword"
}))(ForgotPasswordForm));

/***/ })

}]);
//# sourceMappingURL=src_components_account_ForgotPasswordForm_jsx.main.js.map