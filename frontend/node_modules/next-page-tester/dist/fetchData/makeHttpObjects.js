"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
function makeHttpObjects({ pageObject: { params, route }, reqMocker, resMocker, refererRoute, }) {
    const req = node_mocks_http_1.default.createRequest({
        url: route,
        params: { ...params },
    });
    if (document && document.cookie) {
        req.headers.cookie = document.cookie;
    }
    if (refererRoute !== undefined && window) {
        req.headers.referer = `${window.location.href}${refererRoute.substring(1)}`;
    }
    return {
        req: reqMocker(req),
        res: resMocker(node_mocks_http_1.default.createResponse()),
    };
}
exports.default = makeHttpObjects;
