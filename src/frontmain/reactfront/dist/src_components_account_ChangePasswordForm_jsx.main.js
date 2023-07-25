(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_account_ChangePasswordForm_jsx"],{

/***/ "./node_modules/bootstrap-icons/icons/key.svg":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap-icons/icons/key.svg ***!
  \****************************************************/
/***/ (function() {

/*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-key",
  viewBox: "0 0 16 16"
}, /*#__PURE__*/React.createElement("path", {
  d: "M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
}));

/***/ }),

/***/ "./node_modules/bootstrap-icons/icons/shield-lock.svg":
/*!************************************************************!*\
  !*** ./node_modules/bootstrap-icons/icons/shield-lock.svg ***!
  \************************************************************/
/***/ (function() {

/*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-shield-lock",
  viewBox: "0 0 16 16"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"
}));

/***/ }),

/***/ "./src/components/account/ChangePasswordForm.jsx":
/*!*******************************************************!*\
  !*** ./src/components/account/ChangePasswordForm.jsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/Field.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/reduxForm.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/renderFormGroupField */ "./src/helpers/renderFormGroupField.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/validation */ "./src/helpers/validation.js");
/* harmony import */ var bootstrap_icons_icons_shield_lock_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap-icons/icons/shield-lock.svg */ "./node_modules/bootstrap-icons/icons/shield-lock.svg");
/* harmony import */ var bootstrap_icons_icons_shield_lock_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_shield_lock_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bootstrap_icons_icons_key_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap-icons/icons/key.svg */ "./node_modules/bootstrap-icons/icons/key.svg");
/* harmony import */ var bootstrap_icons_icons_key_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_key_svg__WEBPACK_IMPORTED_MODULE_4__);







var ChangePasswordForm = function ChangePasswordForm(props) {
  var handleSubmit = props.handleSubmit,
    submitting = props.submitting,
    onSubmit = props.onSubmit,
    submitFailed = props.submitFailed;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card border-info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h6", {
    className: "card-header bg-info text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(bootstrap_icons_icons_key_svg__WEBPACK_IMPORTED_MODULE_4__.ReactComponent, null), " Change Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit),
    className: "needs-validation ".concat(submitFailed ? "was-validated" : ""),
    noValidate: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "currentPassword",
    type: "password",
    label: "Current Password",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "******",
    icon: bootstrap_icons_icons_shield_lock_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.required, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.maxLength20, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.minLength8],
    required: true,
    maxLength: "20",
    minLength: "8",
    className: "mb-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "password",
    type: "password",
    label: "New Password",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "******",
    icon: bootstrap_icons_icons_shield_lock_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.required, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.maxLength20, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.minLength8],
    required: true,
    maxLength: "20",
    minLength: "8",
    className: "mb-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_5__["default"], {
    name: "confirmPassword",
    type: "password",
    label: "Confirm New password",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "******",
    icon: bootstrap_icons_icons_shield_lock_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.required, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.maxLength20, _helpers_validation__WEBPACK_IMPORTED_MODULE_2__.minLength8],
    required: true,
    maxLength: "20",
    minLength: "8",
    className: "mb-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    className: "btn btn-info  d-flex",
    disabled: submitting
  }, "Submit"))));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,redux__WEBPACK_IMPORTED_MODULE_6__.compose)((0,redux_form__WEBPACK_IMPORTED_MODULE_7__["default"])({
  form: "changepassword"
}))(ChangePasswordForm));

/***/ })

}]);
//# sourceMappingURL=src_components_account_ChangePasswordForm_jsx.main.js.map