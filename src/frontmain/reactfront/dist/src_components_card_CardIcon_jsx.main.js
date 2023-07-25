"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_card_CardIcon_jsx"],{

/***/ "./src/components/card/CardIcon.jsx":
/*!******************************************!*\
  !*** ./src/components/card/CardIcon.jsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");


var CardIcon = function CardIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: props.to,
    className: "text-decoration-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-body"
  }, props.children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h6", {
    className: "card-title text-capitalize"
  }, props.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-text text-success"
  }, props.text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("small", {
    className: "text-muted"
  }, props.tips))));
};
/* harmony default export */ __webpack_exports__["default"] = (CardIcon);

/***/ })

}]);
//# sourceMappingURL=src_components_card_CardIcon_jsx.main.js.map