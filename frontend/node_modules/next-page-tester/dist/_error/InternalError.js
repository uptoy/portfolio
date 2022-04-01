"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
class InternalError extends Error {
    constructor(message) {
        super(`[next-page-tester] ${message}`);
    }
}
exports.InternalError = InternalError;
