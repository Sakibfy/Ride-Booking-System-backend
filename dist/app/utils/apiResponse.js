"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
/**
 * Send a standardized API response
 */
const sendResponse = (res, { statusCode = 200, success = true, message = 'Request successful', data = null, meta, }) => {
    res.status(statusCode).json(Object.assign({ success,
        message,
        data }, (meta && { meta })));
};
exports.sendResponse = sendResponse;
