"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_card_CardFeaturedProduct_jsx"],{

/***/ "./src/components/card/CardFeaturedProduct.jsx":
/*!*****************************************************!*\
  !*** ./src/components/card/CardFeaturedProduct.jsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_icons_icons_star_fill_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap-icons/icons/star-fill.svg */ "./node_modules/bootstrap-icons/icons/star-fill.svg");
/* harmony import */ var bootstrap_icons_icons_star_fill_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_icons_star_fill_svg__WEBPACK_IMPORTED_MODULE_1__);



var CardFeaturedProduct = function CardFeaturedProduct(props) {
  var products = props.data;
  var handleClick = function handleClick(url) {
    window.location.href = url;
  };
  var displayedProducts = products.slice(0, 6);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-header fw-bold text-uppercase"
  }, "Featured Products"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "card-body"
  }, displayedProducts.map(function (product, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "row ".concat(idx + 1 === displayedProducts.length ? "" : "mb-3"),
      key: idx
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "col-md-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      src: product.thumbnail,
      className: "img-fluid",
      alt: "..."
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "col-md-8"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h6", {
      className: "text-capitalize mb-1",
      onClick: function onClick() {
        return handleClick(product.link + product.id);
      },
      style: {
        cursor: "pointer"
      }
    }, product.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "mb-2"
    }, Array.from({
      length: product.star
    }, function (_, key) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(bootstrap_icons_icons_star_fill_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, {
        className: "text-warning me-1",
        key: key
      });
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "fw-bold h5"
    }, "$", product.price), product.originPrice > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("del", {
      className: "small text-muted ms-2"
    }, "$", product.originPrice)));
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (CardFeaturedProduct);

/***/ })

}]);
//# sourceMappingURL=src_components_card_CardFeaturedProduct_jsx.main.js.map