"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_carousel_Banner_jsx"],{

/***/ "./src/components/carousel/Banner.jsx":
/*!********************************************!*\
  !*** ./src/components/carousel/Banner.jsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");


var Item = function Item(_ref) {
  var item = _ref.item,
    index = _ref.index;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "carousel-item ".concat(index === 0 ? "active" : "")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: item.to
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: item.img,
    className: "img-fluid",
    alt: item.title
  }), (item.title || item.description) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "carousel-caption d-none d-md-block"
  }, item.title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h5", null, item.title), item.description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, item.description))));
};
var Indicator = function Indicator(_ref2) {
  var item = _ref2.item,
    index = _ref2.index;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    "data-bs-target": "#".concat(item),
    "data-bs-slide-to": index,
    className: "".concat(index === 0 ? "active" : "")
  });
};
var Banner = function Banner(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: props.id,
    className: "carousel slide ".concat(props.className),
    "data-bs-ride": "carousel",
    style: {
      minHeight: 100
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ol", {
    className: "carousel-indicators"
  }, props.data.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Indicator, {
      item: props.id,
      index: index,
      key: index
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "carousel-inner"
  }, props.data.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Item, {
      item: item,
      index: index,
      key: index
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "carousel-control-prev",
    href: "#".concat(props.id),
    role: "button",
    "data-bs-slide": "prev"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "carousel-control-prev-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "sr-only"
  }, "Previous")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "carousel-control-next",
    href: "#".concat(props.id),
    role: "button",
    "data-bs-slide": "next"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "carousel-control-next-icon",
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "sr-only"
  }, "Next")));
};
/* harmony default export */ __webpack_exports__["default"] = (Banner);

/***/ })

}]);
//# sourceMappingURL=src_components_carousel_Banner_jsx.main.js.map