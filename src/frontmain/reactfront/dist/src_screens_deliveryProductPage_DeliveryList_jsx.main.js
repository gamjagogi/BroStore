"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_screens_deliveryProductPage_DeliveryList_jsx"],{

/***/ "./src/screens/deliveryProductPage/DeliveryList.jsx":
/*!**********************************************************!*\
  !*** ./src/screens/deliveryProductPage/DeliveryList.jsx ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");
/* harmony import */ var _Request_RequestConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Request/RequestConfig */ "./src/screens/Request/RequestConfig.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _category_DeliveryCategoryConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category/DeliveryCategoryConfig */ "./src/screens/deliveryProductPage/category/DeliveryCategoryConfig.jsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Paging = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_Paging_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/Paging */ "./src/components/Paging.jsx"));
});
var FilterCategory = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_filter_DeliveryCategory_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/filter/DeliveryCategory */ "./src/components/filter/DeliveryCategory.jsx"));
});
var FilterPrice = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_filter_Price_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/filter/Price */ "./src/components/filter/Price.jsx"));
});
var FilterStar = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_filter_Star_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/filter/Star */ "./src/components/filter/Star.jsx"));
});
var CardServices = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_card_CardServices_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/card/CardServices */ "./src/components/card/CardServices.jsx"));
});
var CardProductGrid = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_card_CardProductGrid_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/card/CardProductGrid */ "./src/components/card/CardProductGrid.jsx"));
});
var CardProductList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "src_components_card_CardProductList_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/card/CardProductList */ "./src/components/card/CardProductList.jsx"));
});
var ProductListView = function ProductListView() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    currentProducts = _useState2[0],
    setCurrentProducts = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    currentPage = _useState4[0],
    setCurrentPage = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    totalPages = _useState6[0],
    setTotalPages = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    totalItems = _useState8[0],
    setTotalItems = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("list"),
    _useState10 = _slicedToArray(_useState9, 2),
    view = _useState10[0],
    setView = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState12 = _slicedToArray(_useState11, 2),
    category = _useState12[0],
    setCategory = _useState12[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_category_DeliveryCategoryConfig__WEBPACK_IMPORTED_MODULE_3__["default"])(category).then(function (products) {
      setTotalItems(products.length);
    }).catch(function (error) {
      console.error("Error occurred while fetching products:", error);
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_category_DeliveryCategoryConfig__WEBPACK_IMPORTED_MODULE_3__["default"])(category).then(function (products) {
      console.log('처음 렌더링');
      console.log(products);
      setTotalItems(products.length);
      setCurrentProducts(products);
    }).catch(function (error) {
      console.error("Error occurred while fetching products:", error);
    });
  }, [category]);
  var onPageChanged = function onPageChanged(page) {
    (0,_category_DeliveryCategoryConfig__WEBPACK_IMPORTED_MODULE_3__["default"])(category).then(function (products) {
      var currentPage = page.currentPage,
        totalPages = page.totalPages,
        pageLimit = page.pageLimit;
      var offset = (currentPage - 1) * pageLimit;
      var currentProducts = products.slice(offset, offset + pageLimit);
      setCurrentPage(currentPage);
      setCurrentProducts(currentProducts);
      setTotalPages(totalPages);
    }).catch(function (error) {
      console.error("Error occurred while fetching products:", error);
    });
  };
  var onChangeView = function onChangeView(view) {
    setView(view);
  };
  var onChangeCategory = function onChangeCategory(props) {
    console.log(props);
    setCategory(props);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-5 bg-primary bs-cover",
    style: {
      backgroundImage: "url(../../images/banner/50-Banner.webp)"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "display-5 px-3 bg-white rounded shadow"
  }, "Delivery Product"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "container-fluid mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "col-md-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FilterCategory, {
    onChangeCategory: onChangeCategory
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CardServices, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "col-md-9"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "col-7"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "align-middle fw-bold"
  }, "results ", totalItems)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "col-5 d-flex justify-content-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    "aria-label": "Grid",
    type: "button",
    style: {
      marginRight: "0.5em"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Link, {
    to: "/deliveryPosting"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__.faPencilSquare
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("select", {
    className: "form-select mw-180 float-start",
    "aria-label": "Default select"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: 1
  }, "Most Popular"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: 2
  }, "Latest items"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("option", {
    value: 3
  }, "\uC900\uBE44\uC911..")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "btn-group ms-3",
    role: "group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    "aria-label": "Grid",
    type: "button",
    onClick: function onClick() {
      return onChangeView("grid");
    },
    className: "btn ".concat(view === "grid" ? "btn-primary" : "btn-outline-primary")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__.faTh
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    "aria-label": "List",
    type: "button",
    onClick: function onClick() {
      return onChangeView("list");
    },
    className: "btn ".concat(view === "list" ? "btn-primary" : "btn-outline-primary")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__.faBars
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "row g-3"
  }, view === "grid" && currentProducts.map(function (product, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: idx,
      className: "col-md-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CardProductGrid, {
      data: product
    }));
  }), view === "list" && currentProducts.map(function (product, idx) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: idx,
      className: "col-md-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CardProductList, {
      data: product
    }));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Paging, {
    totalRecords: totalItems,
    pageLimit: 9,
    pageNeighbours: 3,
    onPageChanged: onPageChanged,
    sizing: "",
    alignment: "justify-content-center"
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (ProductListView);

/***/ })

}]);
//# sourceMappingURL=src_screens_deliveryProductPage_DeliveryList_jsx.main.js.map