"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_carousel_Carousel_jsx"],{

/***/ "./src/components/carousel/Carousel.jsx":
/*!**********************************************!*\
  !*** ./src/components/carousel/Carousel.jsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var Carousel = function Carousel(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: props.id,
    className: "carousel slide ".concat(props.className),
    "data-bs-ride": "carousel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "carousel-inner"
  }, props.children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "carousel-control-prev text-dark",
    href: "#" + props.id,
    role: "button",
    "data-bs-slide": "prev",
    style: {
      left: "-40px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "carousel-control-prev-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "sr-only"
  }, "Previous")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "carousel-control-next text-dark",
    href: "#" + props.id,
    role: "button",
    "data-bs-slide": "next",
    style: {
      right: "-10px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "carousel-control-next-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "sr-only"
  }, "Next")));
};
/* harmony default export */ __webpack_exports__["default"] = (Carousel);

/***/ })

}]);
//# sourceMappingURL=src_components_carousel_Carousel_jsx.main.js.map