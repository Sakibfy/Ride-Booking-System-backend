"use strict";
// src/modules/rider/rider.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiderController = void 0;
const rider_service_1 = require("./rider.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.RiderController = {
    getRideHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const riderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!riderId) {
                return res.status(http_status_codes_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: "Unauthorized. Rider ID missing.",
                });
            }
            const rides = yield rider_service_1.RiderService.getRideHistory(riderId);
            res.status(http_status_codes_1.default.OK).json({
                success: true,
                message: "Rider ride history fetched successfully",
                data: rides,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || "Something went wrong",
            });
        }
    }),
};
