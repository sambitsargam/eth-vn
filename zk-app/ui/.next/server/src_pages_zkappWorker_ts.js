/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/zkappWorker.ts":
/*!**********************************!*\
  !*** ./src/pages/zkappWorker.ts ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! o1js */ \"o1js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);\no1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst state = {\n    RecycleCompany: null,\n    zkapp: null,\n    transaction: null\n};\n// ---------------------------------------------------------------------------------------\nconst functions = {\n    setActiveInstanceToBerkeley: async (args)=>{\n        const Berkeley = o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.Network(\"https://archive.berkeley.minaexplorer.com\");\n        o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.setActiveInstance(Berkeley);\n    },\n    loadContract: async (args)=>{\n        const { RecycleCompany } = await Promise.all(/*! import() */[__webpack_require__.e(\"vendor-chunks/o1js\"), __webpack_require__.e(\"contracts_build_src_Add_js\")]).then(__webpack_require__.bind(__webpack_require__, /*! ../../../contracts/build/src/Add.js */ \"../contracts/build/src/Add.js\"));\n        state.RecycleCompany = RecycleCompany;\n    },\n    compileContract: async (args)=>{\n        await state.RecycleCompany.compile();\n    },\n    fetchAccount: async (args)=>{\n        const publicKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(args.publicKey58);\n        return await (0,o1js__WEBPACK_IMPORTED_MODULE_0__.fetchAccount)({\n            publicKey\n        });\n    },\n    initZkappInstance: async (args)=>{\n        const publicKey = o1js__WEBPACK_IMPORTED_MODULE_0__.PublicKey.fromBase58(\"B62qj5vSsQiuugm8oYkYf5mXgaPQf32JZ9AaGuS9QsCpC19PEHLUjhs\");\n    },\n    getRequirementsHash: async (args)=>{\n        const currentNum = await state.zkapp.verifiedRequirementsHash.fetch();\n        return JSON.stringify(currentNum.toJSON());\n    },\n    createPublishReportTransaction: async (args)=>{\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(()=>{\n            state.zkapp.publishReport(args.report);\n        });\n        state.transaction = transaction;\n    },\n    createPublishProofsTransaction: async (args)=>{\n        console.log(\"createPublishProofsTransaction: \", args.report, args.requirements);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(()=>{\n            state.zkapp.publishProof(args.report, args.requirements);\n        });\n        state.transaction = transaction;\n    },\n    createVerifyProofsTransaction: async (args)=>{\n        console.log(\"createVerifyProofsTransaction: \", args.requirements);\n        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__.Mina.transaction(()=>{\n            state.zkapp.VerifyOrganization(args.requirements);\n        });\n        state.transaction = transaction;\n    },\n    proveTransaction: async (args)=>{\n        await state.transaction.prove();\n    },\n    getTransactionJSON: async (args)=>{\n        return state.transaction.toJSON();\n    }\n};\nif (false) {}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvemthcHBXb3JrZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMkQ7QUFRM0QsTUFBTUcsUUFBUTtJQUNaQyxnQkFBZ0I7SUFDaEJDLE9BQU87SUFDUEMsYUFBYTtBQUNmO0FBRUEsMEZBQTBGO0FBRTFGLE1BQU1DLFlBQVk7SUFDaEJDLDZCQUE2QixPQUFPQztRQUNsQyxNQUFNQyxXQUFXVixzQ0FBSUEsQ0FBQ1csT0FBTyxDQUMzQjtRQUVGWCxzQ0FBSUEsQ0FBQ1ksaUJBQWlCLENBQUNGO0lBQ3pCO0lBQ0FHLGNBQWMsT0FBT0o7UUFDbkIsTUFBTSxFQUFFTCxjQUFjLEVBQUUsR0FBRyxNQUFNLDhQQUFPO1FBQ3hDRCxNQUFNQyxjQUFjLEdBQUdBO0lBQ3pCO0lBQ0FVLGlCQUFpQixPQUFPTDtRQUN0QixNQUFNTixNQUFNQyxjQUFjLENBQUVXLE9BQU87SUFDckM7SUFDQWIsY0FBYyxPQUFPTztRQUNuQixNQUFNTyxZQUFZZiwyQ0FBU0EsQ0FBQ2dCLFVBQVUsQ0FBQ1IsS0FBS1MsV0FBVztRQUN2RCxPQUFPLE1BQU1oQixrREFBWUEsQ0FBQztZQUFFYztRQUFVO0lBQ3hDO0lBQ0FHLG1CQUFtQixPQUFPVjtRQUN4QixNQUFNTyxZQUFZZiwyQ0FBU0EsQ0FBQ2dCLFVBQVUsQ0FBQztJQUN6QztJQUNBRyxxQkFBcUIsT0FBT1g7UUFDMUIsTUFBTVksYUFBYSxNQUFNbEIsTUFBTUUsS0FBSyxDQUFFaUIsd0JBQXdCLENBQUNDLEtBQUs7UUFDcEUsT0FBT0MsS0FBS0MsU0FBUyxDQUFDSixXQUFZSyxNQUFNO0lBQzFDO0lBQ0FDLGdDQUFnQyxPQUFPbEI7UUFDckMsTUFBTUgsY0FBYyxNQUFNTixzQ0FBSUEsQ0FBQ00sV0FBVyxDQUFDO1lBQ3pDSCxNQUFNRSxLQUFLLENBQUV1QixhQUFhLENBQUNuQixLQUFLb0IsTUFBTTtRQUN4QztRQUNBMUIsTUFBTUcsV0FBVyxHQUFHQTtJQUN0QjtJQUNBd0IsZ0NBQWdDLE9BQU9yQjtRQUNyQ3NCLFFBQVFDLEdBQUcsQ0FBQyxvQ0FBb0N2QixLQUFLb0IsTUFBTSxFQUFFcEIsS0FBS3dCLFlBQVk7UUFDOUUsTUFBTTNCLGNBQWMsTUFBTU4sc0NBQUlBLENBQUNNLFdBQVcsQ0FBQztZQUN6Q0gsTUFBTUUsS0FBSyxDQUFFNkIsWUFBWSxDQUFDekIsS0FBS29CLE1BQU0sRUFBRXBCLEtBQUt3QixZQUFZO1FBQzFEO1FBQ0E5QixNQUFNRyxXQUFXLEdBQUdBO0lBQ3RCO0lBQ0E2QiwrQkFBK0IsT0FBTzFCO1FBQ3BDc0IsUUFBUUMsR0FBRyxDQUFDLG1DQUFtQ3ZCLEtBQUt3QixZQUFZO1FBQ2hFLE1BQU0zQixjQUFjLE1BQU1OLHNDQUFJQSxDQUFDTSxXQUFXLENBQUM7WUFDekNILE1BQU1FLEtBQUssQ0FBRStCLGtCQUFrQixDQUFDM0IsS0FBS3dCLFlBQVk7UUFDbkQ7UUFDQTlCLE1BQU1HLFdBQVcsR0FBR0E7SUFDdEI7SUFDQStCLGtCQUFrQixPQUFPNUI7UUFDdkIsTUFBTU4sTUFBTUcsV0FBVyxDQUFFZ0MsS0FBSztJQUNoQztJQUNBQyxvQkFBb0IsT0FBTzlCO1FBQ3pCLE9BQU9OLE1BQU1HLFdBQVcsQ0FBRW9CLE1BQU07SUFDbEM7QUFDRjtBQWdCQSxJQUFJLEtBQWtCLEVBQWEsRUFhbEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91aS8uL3NyYy9wYWdlcy96a2FwcFdvcmtlci50cz8yYTUyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RmllbGQsIE1pbmEsIFB1YmxpY0tleSwgZmV0Y2hBY2NvdW50IH0gZnJvbSAnbzFqcyc7XG5cbnR5cGUgVHJhbnNhY3Rpb24gPSBBd2FpdGVkPFJldHVyblR5cGU8dHlwZW9mIE1pbmEudHJhbnNhY3Rpb24+PjtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmltcG9ydCB0eXBlIHsgUmVjeWNsZUNvbXBhbnksIFJlcG9ydCwgUmVxdWlyZW1lbnRzIH0gZnJvbSAnLi4vLi4vLi4vY29udHJhY3RzL3NyYy9BZGQnO1xuXG5jb25zdCBzdGF0ZSA9IHtcbiAgUmVjeWNsZUNvbXBhbnk6IG51bGwgYXMgbnVsbCB8IHR5cGVvZiBSZWN5Y2xlQ29tcGFueSxcbiAgemthcHA6IG51bGwgYXMgbnVsbCB8IFJlY3ljbGVDb21wYW55LFxuICB0cmFuc2FjdGlvbjogbnVsbCBhcyBudWxsIHwgVHJhbnNhY3Rpb24sXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgZnVuY3Rpb25zID0ge1xuICBzZXRBY3RpdmVJbnN0YW5jZVRvQmVya2VsZXk6IGFzeW5jIChhcmdzOiB7fSkgPT4ge1xuICAgIGNvbnN0IEJlcmtlbGV5ID0gTWluYS5OZXR3b3JrKFxuICAgICAgJ2h0dHBzOi8vYXJjaGl2ZS5iZXJrZWxleS5taW5hZXhwbG9yZXIuY29tJ1xuICAgICk7XG4gICAgTWluYS5zZXRBY3RpdmVJbnN0YW5jZShCZXJrZWxleSk7XG4gIH0sXG4gIGxvYWRDb250cmFjdDogYXN5bmMgKGFyZ3M6IHt9KSA9PiB7XG4gICAgY29uc3QgeyBSZWN5Y2xlQ29tcGFueSB9ID0gYXdhaXQgaW1wb3J0KCcuLi8uLi8uLi9jb250cmFjdHMvYnVpbGQvc3JjL0FkZC5qcycpO1xuICAgIHN0YXRlLlJlY3ljbGVDb21wYW55ID0gUmVjeWNsZUNvbXBhbnk7XG4gIH0sXG4gIGNvbXBpbGVDb250cmFjdDogYXN5bmMgKGFyZ3M6IHt9KSA9PiB7XG4gICAgYXdhaXQgc3RhdGUuUmVjeWNsZUNvbXBhbnkhLmNvbXBpbGUoKTtcbiAgfSxcbiAgZmV0Y2hBY2NvdW50OiBhc3luYyAoYXJnczogeyBwdWJsaWNLZXk1ODogc3RyaW5nIH0pID0+IHtcbiAgICBjb25zdCBwdWJsaWNLZXkgPSBQdWJsaWNLZXkuZnJvbUJhc2U1OChhcmdzLnB1YmxpY0tleTU4KTtcbiAgICByZXR1cm4gYXdhaXQgZmV0Y2hBY2NvdW50KHsgcHVibGljS2V5IH0pO1xuICB9LFxuICBpbml0WmthcHBJbnN0YW5jZTogYXN5bmMgKGFyZ3M6IHsgcHVibGljS2V5NTg6IHN0cmluZyB9KSA9PiB7XG4gICAgY29uc3QgcHVibGljS2V5ID0gUHVibGljS2V5LmZyb21CYXNlNTgoJ0I2MnFqNXZTc1FpdXVnbThvWWtZZjVtWGdhUFFmMzJKWjlBYUd1UzlRc0NwQzE5UEVITFVqaHMnKTtcbiAgfSxcbiAgZ2V0UmVxdWlyZW1lbnRzSGFzaDogYXN5bmMgKGFyZ3M6IHt9KSA9PiB7XG4gICAgY29uc3QgY3VycmVudE51bSA9IGF3YWl0IHN0YXRlLnprYXBwIS52ZXJpZmllZFJlcXVpcmVtZW50c0hhc2guZmV0Y2goKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY3VycmVudE51bSEudG9KU09OKCkpO1xuICB9LFxuICBjcmVhdGVQdWJsaXNoUmVwb3J0VHJhbnNhY3Rpb246IGFzeW5jIChhcmdzOiB7IHJlcG9ydDogUmVwb3J0IH0pID0+IHtcbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IGF3YWl0IE1pbmEudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgICAgc3RhdGUuemthcHAhLnB1Ymxpc2hSZXBvcnQoYXJncy5yZXBvcnQpO1xuICAgIH0pO1xuICAgIHN0YXRlLnRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb247XG4gIH0sXG4gIGNyZWF0ZVB1Ymxpc2hQcm9vZnNUcmFuc2FjdGlvbjogYXN5bmMgKGFyZ3M6IHsgcmVwb3J0OiBSZXBvcnQsIHJlcXVpcmVtZW50czogUmVxdWlyZW1lbnRzIH0pID0+IHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlUHVibGlzaFByb29mc1RyYW5zYWN0aW9uOiAnLCBhcmdzLnJlcG9ydCwgYXJncy5yZXF1aXJlbWVudHMpXG4gICAgY29uc3QgdHJhbnNhY3Rpb24gPSBhd2FpdCBNaW5hLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICAgIHN0YXRlLnprYXBwIS5wdWJsaXNoUHJvb2YoYXJncy5yZXBvcnQsIGFyZ3MucmVxdWlyZW1lbnRzKTtcbiAgICB9KTtcbiAgICBzdGF0ZS50cmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uO1xuICB9LFxuICBjcmVhdGVWZXJpZnlQcm9vZnNUcmFuc2FjdGlvbjogYXN5bmMgKGFyZ3M6IHsgcmVxdWlyZW1lbnRzOiBSZXF1aXJlbWVudHMgfSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVWZXJpZnlQcm9vZnNUcmFuc2FjdGlvbjogJywgYXJncy5yZXF1aXJlbWVudHMpXG4gICAgY29uc3QgdHJhbnNhY3Rpb24gPSBhd2FpdCBNaW5hLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICAgIHN0YXRlLnprYXBwIS5WZXJpZnlPcmdhbml6YXRpb24oYXJncy5yZXF1aXJlbWVudHMpO1xuICAgIH0pO1xuICAgIHN0YXRlLnRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb247XG4gIH0sXG4gIHByb3ZlVHJhbnNhY3Rpb246IGFzeW5jIChhcmdzOiB7fSkgPT4ge1xuICAgIGF3YWl0IHN0YXRlLnRyYW5zYWN0aW9uIS5wcm92ZSgpO1xuICB9LFxuICBnZXRUcmFuc2FjdGlvbkpTT046IGFzeW5jIChhcmdzOiB7fSkgPT4ge1xuICAgIHJldHVybiBzdGF0ZS50cmFuc2FjdGlvbiEudG9KU09OKCk7XG4gIH0sXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IHR5cGUgV29ya2VyRnVuY3Rpb25zID0ga2V5b2YgdHlwZW9mIGZ1bmN0aW9ucztcblxuZXhwb3J0IHR5cGUgWmthcHBXb3JrZXJSZXF1ZXN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBmbjogV29ya2VyRnVuY3Rpb25zO1xuICBhcmdzOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBaa2FwcFdvcmtlclJlcG9uc2UgPSB7XG4gIGlkOiBudW1iZXI7XG4gIGRhdGE6IGFueTtcbn07XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnbWVzc2FnZScsXG4gICAgYXN5bmMgKGV2ZW50OiBNZXNzYWdlRXZlbnQ8WmthcHBXb3JrZXJSZXF1ZXN0PikgPT4ge1xuICAgICAgY29uc3QgcmV0dXJuRGF0YSA9IGF3YWl0IGZ1bmN0aW9uc1tldmVudC5kYXRhLmZuXShldmVudC5kYXRhLmFyZ3MpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlOiBaa2FwcFdvcmtlclJlcG9uc2UgPSB7XG4gICAgICAgIGlkOiBldmVudC5kYXRhLmlkLFxuICAgICAgICBkYXRhOiByZXR1cm5EYXRhLFxuICAgICAgfTtcbiAgICAgIHBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJNaW5hIiwiUHVibGljS2V5IiwiZmV0Y2hBY2NvdW50Iiwic3RhdGUiLCJSZWN5Y2xlQ29tcGFueSIsInprYXBwIiwidHJhbnNhY3Rpb24iLCJmdW5jdGlvbnMiLCJzZXRBY3RpdmVJbnN0YW5jZVRvQmVya2VsZXkiLCJhcmdzIiwiQmVya2VsZXkiLCJOZXR3b3JrIiwic2V0QWN0aXZlSW5zdGFuY2UiLCJsb2FkQ29udHJhY3QiLCJjb21waWxlQ29udHJhY3QiLCJjb21waWxlIiwicHVibGljS2V5IiwiZnJvbUJhc2U1OCIsInB1YmxpY0tleTU4IiwiaW5pdFprYXBwSW5zdGFuY2UiLCJnZXRSZXF1aXJlbWVudHNIYXNoIiwiY3VycmVudE51bSIsInZlcmlmaWVkUmVxdWlyZW1lbnRzSGFzaCIsImZldGNoIiwiSlNPTiIsInN0cmluZ2lmeSIsInRvSlNPTiIsImNyZWF0ZVB1Ymxpc2hSZXBvcnRUcmFuc2FjdGlvbiIsInB1Ymxpc2hSZXBvcnQiLCJyZXBvcnQiLCJjcmVhdGVQdWJsaXNoUHJvb2ZzVHJhbnNhY3Rpb24iLCJjb25zb2xlIiwibG9nIiwicmVxdWlyZW1lbnRzIiwicHVibGlzaFByb29mIiwiY3JlYXRlVmVyaWZ5UHJvb2ZzVHJhbnNhY3Rpb24iLCJWZXJpZnlPcmdhbml6YXRpb24iLCJwcm92ZVRyYW5zYWN0aW9uIiwicHJvdmUiLCJnZXRUcmFuc2FjdGlvbkpTT04iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJyZXR1cm5EYXRhIiwiZGF0YSIsImZuIiwibWVzc2FnZSIsImlkIiwicG9zdE1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/zkappWorker.ts\n");

/***/ }),

/***/ "o1js":
/*!***********************!*\
  !*** external "o1js" ***!
  \***********************/
/***/ ((module) => {

module.exports = import("o1js");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			"src_pages_zkappWorker_ts": 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/zkappWorker.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;