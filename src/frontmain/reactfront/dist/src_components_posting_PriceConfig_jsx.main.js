"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_posting_PriceConfig_jsx"],{

/***/ "./src/components/posting/PriceConfig.jsx":
/*!************************************************!*\
  !*** ./src/components/posting/PriceConfig.jsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Form */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/InputGroup */ "./node_modules/react-bootstrap/esm/InputGroup.js");
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-rating-stars-component */ "./node_modules/react-rating-stars-component/dist/react-stars.js");




var PriceConfig = function PriceConfig(props) {
  var setPrice = props.setPrice,
    setOriginPrice = props.setOriginPrice,
    setDiscountPrice = props.setDiscountPrice,
    setDiscountPercent = props.setDiscountPercent,
    setStar = props.setStar,
    star = props.star;
  var handlePriceChange = function handlePriceChange(event) {
    setPrice(event.target.value);
  };
  var handleOriginPriceChange = function handleOriginPriceChange(event) {
    setOriginPrice(event.target.value);
  };
  var handleDiscountPriceChange = function handleDiscountPriceChange(event) {
    setDiscountPrice(event.target.value);
  };
  var handleDiscountPercentChange = function handleDiscountPercentChange(event) {
    setDiscountPercent(event.target.value);
  };
  var handleStarChange = function handleStarChange(event) {
    setStar(event);
  };
  var thirdExample = {
    size: 40,
    count: 5,
    isHalf: false,
    value: star,
    color: "grey",
    activeColor: "yellow",
    onChange: handleStarChange
  };
  var r = {
    defaultValue: 4,
    min: 0,
    max: 5,
    step: 0.5
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"].Text, null, "Price"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__["default"].Control, {
    "aria-label": "Amount (to the nearest dollar)",
    onChange: handlePriceChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"].Text, null, "\uC6D0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"].Text, null, "Origin Price"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__["default"].Control, {
    "aria-label": "Amount (to the nearest dollar)",
    onChange: handleOriginPriceChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"].Text, null, "\uC6D0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"].Text, null, "Discount Price"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__["default"].Control, {
    "aria-label": "Amount (to the nearest dollar)",
    onChange: handleDiscountPriceChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"].Text, null, "\uC6D0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"].Text, null, "Discount Percent"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_3__["default"].Control, {
    "aria-label": "Amount (to the nearest dollar)",
    onChange: handleDiscountPercentChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_bootstrap_InputGroup__WEBPACK_IMPORTED_MODULE_2__["default"].Text, null, "%")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "App",
    style: {
      marginRight: '20px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rating_stars_component__WEBPACK_IMPORTED_MODULE_1__["default"], thirdExample)));
};
/* harmony default export */ __webpack_exports__["default"] = (PriceConfig);

/***/ })

}]);
//# sourceMappingURL=src_components_posting_PriceConfig_jsx.main.js.map