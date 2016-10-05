"use strict";
const express = require('express');
class apiRoutesLevel3 {
    constructor() {
        this._router = express.Router();
        this._router.use((req, res, next) => {
            if (req.cookies['decodedToken'].permissions == 3) {
                next();
            }
            else {
                //user authenticated but unauthorized
                return res.status(403).json({
                    success: false,
                    status: "User unauthorized...Need level 1"
                });
            }
        });
        this._router.get('/api', function (req, res, next) {
            res.status(200).json({
                success: true,
                message: "You entered restricted area with permission 1"
            });
        });
        this._router.get('/list', function (req, res, next) {
            res.status(200).json({
                success: true,
                message: "You entered restricted area with permission 1"
            });
        });
    }
    returnRouter() {
        return this._router;
    }
}
exports.apiRoutesLevel3 = apiRoutesLevel3;
//# sourceMappingURL=apiRoutesLevel3.js.map