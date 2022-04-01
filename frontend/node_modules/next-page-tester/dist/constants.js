"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeEnvironment = exports.NEXT_ROOT_ELEMENT_ID = exports.FOUR_O_FOUR_PATH = exports.ERROR_PATH = exports.DOCUMENT_PATH = exports.APP_PATH = void 0;
exports.APP_PATH = '/_app';
exports.DOCUMENT_PATH = '/_document';
exports.ERROR_PATH = '/_error';
exports.FOUR_O_FOUR_PATH = '/404';
exports.NEXT_ROOT_ELEMENT_ID = '__next';
var RuntimeEnvironment;
(function (RuntimeEnvironment) {
    RuntimeEnvironment["SERVER"] = "server";
    RuntimeEnvironment["CLIENT"] = "client";
})(RuntimeEnvironment = exports.RuntimeEnvironment || (exports.RuntimeEnvironment = {}));
