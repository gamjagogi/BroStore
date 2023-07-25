"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_card_CardDealsOfTheDay_jsx"],{

/***/ "./src/components/card/CardDealsOfTheDay.jsx":
/*!***************************************************!*\
  !*** ./src/components/card/CardDealsOfTheDay.jsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_icons_icons_stopwatch_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-icons/icons/stopwatch.svg */ "./node_modules/bootstrap-icons/icons/stopwatch.svg");
/* harmony import */ var bootstrap_icons_icons_stopwatch_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_stopwatch_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_countdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-countdown */ "./node_modules/react-countdown/dist/index.es.js");





// Random component
var Completionist = function Completionist() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, "Deals End!");
};

// Renderer callback with condition
var renderer = function renderer(_ref) {
  var hours = _ref.hours,
    minutes = _ref.minutes,
    seconds = _ref.seconds,
    completed = _ref.completed;
  if (completed) {
    // Render a completed state
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Completionist, null);
  } else {
    // Render a countdown
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "text-muted small"
    }, hours, ":", minutes, ":", seconds, " Left");
  }
};
var CardDealsOfTheDay = function CardDealsOfTheDay(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h5", {
    className: "card-title pb-3 border-bottom"
  }, props.title, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(bootstrap_icons_icons_stopwatch_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, {
    className: "text-primary"
  }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_countdown__WEBPACK_IMPORTED_MODULE_2__["default"], {
    date: props.endDate,
    renderer: renderer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "float-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
    to: props.to,
    className: "btn btn-sm btn-outline-primary"
  }, "View All"))), props.children));
};
/* harmony default export */ __webpack_exports__["default"] = (CardDealsOfTheDay);

/***/ })

}]);
//# sourceMappingURL=src_components_card_CardDealsOfTheDay_jsx.main.js.map