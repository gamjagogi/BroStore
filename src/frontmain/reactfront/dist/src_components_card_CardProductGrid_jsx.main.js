(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_card_CardProductGrid_jsx"],{

/***/ "./node_modules/bootstrap-icons/icons/star-fill.svg":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap-icons/icons/star-fill.svg ***!
  \**********************************************************/
/***/ (function() {

/*#__PURE__*/React.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  fill: "currentColor",
  class: "bi bi-star-fill",
  viewBox: "0 0 16 16"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
}));

/***/ }),

/***/ "./src/components/card/CardProductGrid.jsx":
/*!*************************************************!*\
  !*** ./src/components/card/CardProductGrid.jsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var bootstrap_icons_icons_star_fill_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-icons/icons/star-fill.svg */ "./node_modules/bootstrap-icons/icons/star-fill.svg");
/* harmony import */ var bootstrap_icons_icons_star_fill_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_star_fill_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");





var CardProductGrid = function CardProductGrid(props) {
  var product = props.data;
  var parser = new DOMParser();
  var doc = parser.parseFromString(product.description, "text/html");
  console.log(doc);
  var plainText = doc.body.textContent;
  console.log(plainText);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: product.thumbnail,
    className: "card-img-top",
    alt: "..."
  }), product.isNew && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "badge bg-success position-absolute mt-2 ms-2"
  }, "New"), product.isHot && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "badge bg-danger position-absolute r-0 mt-2 me-2"
  }, "Hot"), (product.discountPercentage > 0 || product.discountPrice > 0) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "rounded position-absolute p-2 bg-warning  ms-2 small ".concat(product.isNew ? "mt-5" : "mt-2")
  }, "-", product.discountPercentage > 0 ? product.discountPercentage + "%" : "$" + product.discountPrice), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h6", {
    className: "card-subtitle mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
    to: product.link + product.id,
    className: "text-decoration-none"
  }, product.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "my-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "fw-bold h5"
  }, "$", product.price), product.originPrice > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("del", {
    className: "small text-muted ms-2"
  }, "$", product.originPrice), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "ms-2"
  }, Array.from({
    length: product.star
  }, function (_, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(bootstrap_icons_icons_star_fill_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, {
      className: "text-warning me-1",
      key: key
    });
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "my-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "fw-bold h9"
  }, "Category : ", product.category)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "btn-group  d-flex",
    role: "group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    className: "btn btn-sm btn-primary",
    title: "Add to cart"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faCartPlus
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    type: "button",
    className: "btn btn-sm btn-outline-secondary",
    title: "Add to wishlist"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faHeart
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (CardProductGrid);

/***/ })

}]);
//# sourceMappingURL=src_components_card_CardProductGrid_jsx.main.js.map