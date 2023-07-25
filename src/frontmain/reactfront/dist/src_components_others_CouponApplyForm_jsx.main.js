"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_others_CouponApplyForm_jsx"],{

/***/ "./src/components/others/CouponApplyForm.jsx":
/*!***************************************************!*\
  !*** ./src/components/others/CouponApplyForm.jsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/Field.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/reduxForm.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _helpers_renderFormField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/renderFormField */ "./src/helpers/renderFormField.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/validation */ "./src/helpers/validation.js");





var CouponApplyForm = function CouponApplyForm(props) {
  var handleSubmit = props.handleSubmit,
    submitting = props.submitting,
    onSubmit = props.onSubmit,
    submitFailed = props.submitFailed;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit),
    className: "needs-validation ".concat(submitFailed ? "was-validated" : ""),
    noValidate: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_3__["default"], {
    name: "coupon",
    type: "text",
    label: "Have coupon?",
    component: _helpers_renderFormField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "Coupon code",
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_2__.required],
    required: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    className: "btn btn-sm btn-primary mt-3 float-end",
    disabled: submitting
  }, "Apply"));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,redux__WEBPACK_IMPORTED_MODULE_4__.compose)((0,redux_form__WEBPACK_IMPORTED_MODULE_5__["default"])({
  form: "couponapplyform"
}))(CouponApplyForm));

/***/ }),

/***/ "./src/helpers/renderFormField.js":
/*!****************************************!*\
  !*** ./src/helpers/renderFormField.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var renderFormField = function renderFormField(props) {
  var input = props.input,
    tips = props.tips,
    label = props.label,
    required = props.required,
    _props$meta = props.meta,
    touched = _props$meta.touched,
    error = _props$meta.error,
    warning = _props$meta.warning;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "form-label ".concat(required ? "required" : ""),
    htmlFor: input.name
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", _extends({}, input, props, {
    id: input.name,
    className: "form-control"
  })), tips && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "form-text"
  }, tips), touched && (error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "invalid-feedback"
  }, error) || warning && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, warning)));
};
/* harmony default export */ __webpack_exports__["default"] = (renderFormField);

/***/ })

}]);
//# sourceMappingURL=src_components_others_CouponApplyForm_jsx.main.js.map