"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_components_Paging_jsx"],{

/***/ "./src/components/Paging.jsx":
/*!***********************************!*\
  !*** ./src/components/Paging.jsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var LEFT_PAGE = "LEFT";
var RIGHT_PAGE = "RIGHT";
var range = function range(from, to) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var i = from;
  var range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};
var Paging = function Paging(props) {
  var _props$totalRecords = props.totalRecords,
    totalRecords = _props$totalRecords === void 0 ? null : _props$totalRecords,
    _props$pageLimit = props.pageLimit,
    pageLimit = _props$pageLimit === void 0 ? 30 : _props$pageLimit,
    _props$pageNeighbours = props.pageNeighbours,
    pageNeighbours = _props$pageNeighbours === void 0 ? 0 : _props$pageNeighbours,
    _props$sizing = props.sizing,
    sizing = _props$sizing === void 0 ? "" : _props$sizing,
    _props$alignment = props.alignment,
    alignment = _props$alignment === void 0 ? "" : _props$alignment,
    _props$onPageChanged = props.onPageChanged,
    onPageChanged = _props$onPageChanged === void 0 ? function () {} : _props$onPageChanged;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState2 = _slicedToArray(_useState, 2),
    currentPage = _useState2[0],
    setCurrentPage = _useState2[1];
  var totalPages = Math.ceil(totalRecords / pageLimit);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    gotoPage(1);
  }, []);
  var gotoPage = function gotoPage(page) {
    var validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    onPageChanged({
      currentPage: validPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords
    });
  };
  var handleClick = function handleClick(page, evt) {
    evt.preventDefault();
    gotoPage(page);
  };
  var handleMoveLeft = function handleMoveLeft(evt) {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };
  var handleMoveRight = function handleMoveRight(evt) {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };
  var fetchPageNumbers = function fetchPageNumbers() {
    var totalNumbers = pageNeighbours * 2 + 3;
    var totalBlocks = totalNumbers + 2;
    if (totalPages > totalBlocks) {
      var _pages = [];
      var leftBound = currentPage - pageNeighbours;
      var rightBound = currentPage + pageNeighbours;
      var beforeLastPage = totalPages - 1;
      var startPage = leftBound > 2 ? leftBound : 2;
      var endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
      _pages = range(startPage, endPage);
      var pagesCount = _pages.length;
      var singleSpillOffset = totalNumbers - pagesCount - 1;
      var leftSpill = startPage > 2;
      var rightSpill = endPage < beforeLastPage;
      var leftSpillPage = LEFT_PAGE;
      var rightSpillPage = RIGHT_PAGE;
      if (leftSpill && !rightSpill) {
        var extraPages = range(startPage - singleSpillOffset, startPage - 1);
        _pages = [leftSpillPage].concat(_toConsumableArray(extraPages), _toConsumableArray(_pages));
      } else if (!leftSpill && rightSpill) {
        var _extraPages = range(endPage + 1, endPage + singleSpillOffset);
        _pages = [].concat(_toConsumableArray(_pages), _toConsumableArray(_extraPages), [rightSpillPage]);
      } else if (leftSpill && rightSpill) {
        _pages = [leftSpillPage].concat(_toConsumableArray(_pages), [rightSpillPage]);
      }
      return [1].concat(_toConsumableArray(_pages), [totalPages]);
    }
    return range(1, totalPages);
  };
  if (!totalRecords || totalPages === 1) return null;
  var pages = fetchPageNumbers();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    "aria-label": "Page navigation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "pagination ".concat(sizing, " ").concat(alignment)
  }, pages.map(function (page, index) {
    if (page === LEFT_PAGE) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index,
      className: "page-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "page-link",
      "aria-label": "Previous",
      onClick: handleMoveLeft
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      "aria-hidden": "true"
    }, "\xAB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "sr-only"
    }, "Previous")));
    if (page === RIGHT_PAGE) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index,
      className: "page-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      className: "page-link",
      href: "#!",
      "aria-label": "Next",
      onClick: handleMoveRight
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      "aria-hidden": "true"
    }, "\xBB"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "sr-only"
    }, "Next")));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      key: index,
      className: "page-item".concat(currentPage === page ? " active" : "")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      className: "page-link",
      href: "#!",
      onClick: function onClick(e) {
        return handleClick(page, e);
      }
    }, page));
  })));
};
Paging.propTypes = {
  totalRecords: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number).isRequired,
  pageLimit: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  pageNeighbours: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  onPageChanged: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  sizing: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(Paging));

/***/ })

}]);
//# sourceMappingURL=src_components_Paging_jsx.main.js.map