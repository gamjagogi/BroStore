(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_account_ProfileForm_jsx"],{

/***/ "./node_modules/bootstrap-icons/icons/calendar-event.svg":
/*!***************************************************************!*\
  !*** ./node_modules/bootstrap-icons/icons/calendar-event.svg ***!
  \***************************************************************/
/***/ (function() {

/*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-calendar-event",
  viewBox: "0 0 16 16"
}, /*#__PURE__*/React.createElement("path", {
  d: "M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
}));

/***/ }),

/***/ "./node_modules/bootstrap-icons/icons/geo-alt.svg":
/*!********************************************************!*\
  !*** ./node_modules/bootstrap-icons/icons/geo-alt.svg ***!
  \********************************************************/
/***/ (function() {

/*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-geo-alt",
  viewBox: "0 0 16 16"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
}));

/***/ }),

/***/ "./node_modules/bootstrap-icons/icons/person.svg":
/*!*******************************************************!*\
  !*** ./node_modules/bootstrap-icons/icons/person.svg ***!
  \*******************************************************/
/***/ (function() {

/*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-person",
  viewBox: "0 0 16 16"
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
}));

/***/ }),

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

/***/ "./src/components/account/ProfileForm.jsx":
/*!************************************************!*\
  !*** ./src/components/account/ProfileForm.jsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/Field.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/reduxForm.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/renderFormGroupField */ "./src/helpers/renderFormGroupField.js");
/* harmony import */ var _helpers_renderFormFileInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/renderFormFileInput */ "./src/helpers/renderFormFileInput.js");
/* harmony import */ var _helpers_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/validation */ "./src/helpers/validation.js");
/* harmony import */ var bootstrap_icons_icons_person_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap-icons/icons/person.svg */ "./node_modules/bootstrap-icons/icons/person.svg");
/* harmony import */ var bootstrap_icons_icons_person_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_person_svg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bootstrap_icons_icons_phone_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap-icons/icons/phone.svg */ "./node_modules/bootstrap-icons/icons/phone.svg");
/* harmony import */ var bootstrap_icons_icons_phone_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_phone_svg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var bootstrap_icons_icons_envelope_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap-icons/icons/envelope.svg */ "./node_modules/bootstrap-icons/icons/envelope.svg");
/* harmony import */ var bootstrap_icons_icons_envelope_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_envelope_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var bootstrap_icons_icons_geo_alt_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! bootstrap-icons/icons/geo-alt.svg */ "./node_modules/bootstrap-icons/icons/geo-alt.svg");
/* harmony import */ var bootstrap_icons_icons_geo_alt_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_geo_alt_svg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var bootstrap_icons_icons_calendar_event_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! bootstrap-icons/icons/calendar-event.svg */ "./node_modules/bootstrap-icons/icons/calendar-event.svg");
/* harmony import */ var bootstrap_icons_icons_calendar_event_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_calendar_event_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var bootstrap_icons_icons_person_lines_fill_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! bootstrap-icons/icons/person-lines-fill.svg */ "./node_modules/bootstrap-icons/icons/person-lines-fill.svg");
/* harmony import */ var bootstrap_icons_icons_person_lines_fill_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_person_lines_fill_svg__WEBPACK_IMPORTED_MODULE_9__);












var ProfileForm = function ProfileForm(props) {
  var handleSubmit = props.handleSubmit,
    submitting = props.submitting,
    onSubmit = props.onSubmit,
    submitFailed = props.submitFailed,
    onImageChange = props.onImageChange,
    imagePreview = props.imagePreview;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit),
    className: "needs-validation ".concat(submitFailed ? "was-validated" : ""),
    noValidate: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card border-primary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h6", {
    className: "card-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(bootstrap_icons_icons_person_lines_fill_svg__WEBPACK_IMPORTED_MODULE_9__.ReactComponent, null), " Profile Detail"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: imagePreview ? imagePreview : "../../images/NO_IMG.png",
    alt: "",
    className: "card-img-top rounded-0 img-fluid bg-secondary"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_10__["default"], {
    name: "formFile",
    component: _helpers_renderFormFileInput__WEBPACK_IMPORTED_MODULE_2__["default"],
    onImageChange: onImageChange,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.required],
    tips: "You don't allow uploading a photo more than 5MB"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "card-text"
  }, "With supporting text below as a natural lead-in to additional content.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "list-group list-group-flush"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_10__["default"], {
    name: "name",
    type: "text",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "Your name",
    icon: bootstrap_icons_icons_person_svg__WEBPACK_IMPORTED_MODULE_4__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.required, _helpers_validation__WEBPACK_IMPORTED_MODULE_3__.name],
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_10__["default"], {
    name: "mobileNo",
    type: "number",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "Mobile no without country code",
    icon: bootstrap_icons_icons_phone_svg__WEBPACK_IMPORTED_MODULE_5__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.required, _helpers_validation__WEBPACK_IMPORTED_MODULE_3__.maxLengthMobileNo, _helpers_validation__WEBPACK_IMPORTED_MODULE_3__.minLengthMobileNo, _helpers_validation__WEBPACK_IMPORTED_MODULE_3__.digit],
    required: true,
    max: "999999999999999",
    min: "9999"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_10__["default"], {
    name: "email",
    type: "email",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "Your email",
    icon: bootstrap_icons_icons_envelope_svg__WEBPACK_IMPORTED_MODULE_6__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.required, _helpers_validation__WEBPACK_IMPORTED_MODULE_3__.email],
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_10__["default"], {
    name: "location",
    type: "text",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "Your location",
    icon: bootstrap_icons_icons_geo_alt_svg__WEBPACK_IMPORTED_MODULE_7__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.required],
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "list-group-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(redux_form__WEBPACK_IMPORTED_MODULE_10__["default"], {
    name: "dob",
    type: "date",
    component: _helpers_renderFormGroupField__WEBPACK_IMPORTED_MODULE_1__["default"],
    placeholder: "Your birthdate",
    icon: bootstrap_icons_icons_calendar_event_svg__WEBPACK_IMPORTED_MODULE_8__.ReactComponent,
    validate: [_helpers_validation__WEBPACK_IMPORTED_MODULE_3__.required],
    required: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "submit",
    className: "btn btn-primary  d-flex",
    disabled: submitting
  }, "Submit"))));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,redux__WEBPACK_IMPORTED_MODULE_11__.compose)((0,redux_form__WEBPACK_IMPORTED_MODULE_12__["default"])({
  form: "profile"
}))(ProfileForm));

/***/ })

}]);
//# sourceMappingURL=src_components_account_ProfileForm_jsx.main.js.map