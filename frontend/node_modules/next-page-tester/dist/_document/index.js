"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentFile = exports.serverRenderDocument = void 0;
var render_1 = require("./render");
Object.defineProperty(exports, "serverRenderDocument", { enumerable: true, get: function () { return __importDefault(render_1).default; } });
var getDocumentFile_1 = require("./getDocumentFile");
Object.defineProperty(exports, "getDocumentFile", { enumerable: true, get: function () { return getDocumentFile_1.getDocumentFile; } });
