"use strict";
(self["webpackChunkreactfront"] = self["webpackChunkreactfront"] || []).push([["src_screens_softwareProductPage_List_jsx"],{

/***/ "./src/screens/softwareProductPage/List.jsx":
/*!**************************************************!*\
  !*** ./src/screens/softwareProductPage/List.jsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.mjs");
/* harmony import */ var _Request_RequestConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Request/RequestConfig */ "./src/screens/Request/RequestConfig.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _category_CategoryConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category/CategoryConfig */ "./src/screens/softwareProductPage/category/CategoryConfig.jsx");
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
  return __webpack_require__.e(/*! import() */ "src_components_filter_SoftwareCategory_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../components/filter/SoftwareCategory */ "./src/components/filter/SoftwareCategory.jsx"));
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
    (0,_category_CategoryConfig__WEBPACK_IMPORTED_MODULE_3__["default"])(category).then(function (products) {
      console.log('처음 렌더링');
      console.log(products);
      console.log(products.length);
      setTotalItems(products.length);
    }).catch(function (error) {
      console.error("Error occurred while fetching products:", error);
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_category_CategoryConfig__WEBPACK_IMPORTED_MODULE_3__["default"])(category).then(function (products) {
      console.log('처음 렌더링');
      console.log(products);
      setTotalItems(products.length);
      setCurrentProducts(products);
    }).catch(function (error) {
      console.error("Error occurred while fetching products:", error);
    });
  }, [category]);
  var onPageChanged = function onPageChanged(page) {
    (0,_category_CategoryConfig__WEBPACK_IMPORTED_MODULE_3__["default"])(category).then(function (products) {
      console.log("onPageChanged 진입");
      console.log(products);
      var currentPage = page.currentPage,
        totalPages = page.totalPages,
        pageLimit = page.pageLimit;
      console.log(currentPage, totalPages, pageLimit);
      var offset = (currentPage - 1) * pageLimit;
      console.log(offset);
      var currentProducts = products.slice(offset, offset + pageLimit);
      console.log(currentProducts);
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
  }, "Software"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
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
  }, totalItems, " results for ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-warning"
  }, "\"\""))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "col-5 d-flex justify-content-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    "aria-label": "Grid",
    type: "button",
    style: {
      marginRight: "0.5em"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Link, {
    to: "/posting"
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

/***/ }),

/***/ "./src/screens/softwareProductPage/category/CategoryConfig.jsx":
/*!*********************************************************************!*\
  !*** ./src/screens/softwareProductPage/category/CategoryConfig.jsx ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Request_RequestConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Request/RequestConfig */ "./src/screens/Request/RequestConfig.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CategoryConfig = function CategoryConfig(categoryName) {
  var category = categoryName;
  console.log(category);
  var getAll = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var accessToken = localStorage.getItem("accessToken");
              var refreshToken = localStorage.getItem("refreshToken");
              if (accessToken && refreshToken) {
                _Request_RequestConfig__WEBPACK_IMPORTED_MODULE_0__["default"].get("/auth/software", {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(accessToken),
                    RefreshToken: "Bearer ".concat(refreshToken)
                  }
                }).then(function (response) {
                  if (response.status === 200) {
                    var products = response.data.data;
                    console.log(products);
                    resolve(products);
                    return products;
                  } else {
                    console.log("게시글을 가져올 수 없습니다..");
                    reject(new Error("게시글을 가져올 수 없습니다.."));
                  }
                }).catch(function (error) {
                  console.error("게시글을 가져올 수 없습니다..", error);
                  reject(new Error("게시글을 가져올 수 없습니다.."));
                });
              } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
              }
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getAll() {
      return _ref.apply(this, arguments);
    };
  }();
  var webCrawling = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var accessToken = localStorage.getItem("accessToken");
              var refreshToken = localStorage.getItem("refreshToken");
              if (accessToken && refreshToken) {
                _Request_RequestConfig__WEBPACK_IMPORTED_MODULE_0__["default"].get("/auth/software/crawling", {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(accessToken),
                    RefreshToken: "Bearer ".concat(refreshToken)
                  }
                }).then(function (response) {
                  if (response.status === 200) {
                    var products = response.data.data;
                    console.log(products);
                    resolve(products);
                    return products;
                  } else {
                    console.log("게시글을 가져올 수 없습니다..");
                    reject(new Error("게시글을 가져올 수 없습니다.."));
                  }
                }).catch(function (error) {
                  console.error("게시글을 가져올 수 없습니다..", error);
                  reject(new Error("게시글을 가져올 수 없습니다.."));
                });
              } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
              }
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function webCrawling() {
      return _ref2.apply(this, arguments);
    };
  }();
  var getMacro = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var accessToken = localStorage.getItem("accessToken");
              var refreshToken = localStorage.getItem("refreshToken");
              if (accessToken && refreshToken) {
                _Request_RequestConfig__WEBPACK_IMPORTED_MODULE_0__["default"].get("/auth/software/macro", {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(accessToken),
                    RefreshToken: "Bearer ".concat(refreshToken)
                  }
                }).then(function (response) {
                  if (response.status === 200) {
                    var products = response.data.data;
                    console.log(products);
                    resolve(products);
                    return products;
                  } else {
                    console.log("게시글을 가져올 수 없습니다..");
                    reject(new Error("게시글을 가져올 수 없습니다.."));
                  }
                }).catch(function (error) {
                  console.error("게시글을 가져올 수 없습니다..", error);
                  reject(new Error("게시글을 가져올 수 없습니다.."));
                });
              } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
              }
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function getMacro() {
      return _ref3.apply(this, arguments);
    };
  }();
  var getMonitoring = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              var accessToken = localStorage.getItem("accessToken");
              var refreshToken = localStorage.getItem("refreshToken");
              if (accessToken && refreshToken) {
                _Request_RequestConfig__WEBPACK_IMPORTED_MODULE_0__["default"].get("/auth/software/monitoring", {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer ".concat(accessToken),
                    RefreshToken: "Bearer ".concat(refreshToken)
                  }
                }).then(function (response) {
                  if (response.status === 200) {
                    var products = response.data.data;
                    console.log(products);
                    resolve(products);
                    return products;
                  } else {
                    console.log("게시글을 가져올 수 없습니다..");
                    reject(new Error("게시글을 가져올 수 없습니다.."));
                  }
                }).catch(function (error) {
                  console.error("게시글을 가져올 수 없습니다..", error);
                  reject(new Error("게시글을 가져올 수 없습니다.."));
                });
              } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
              }
            }));
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function getMonitoring() {
      return _ref4.apply(this, arguments);
    };
  }();
  if (category == '') {
    return getAll();
  } else if (category == 'Web Crawling') {
    return webCrawling();
  } else if (category == 'Macro') {
    return getMacro();
  } else if (category == 'Monitoring') {
    return getMonitoring();
  } else {
    return getAll();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (CategoryConfig);

/***/ })

}]);
//# sourceMappingURL=src_screens_softwareProductPage_List_jsx.main.js.map