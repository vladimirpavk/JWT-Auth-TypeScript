"use strict";
const express = require('express');
const apiRoutesLevel1_1 = require('./apiRoutesLevel1');
const apiRoutesLevel2_1 = require('./apiRoutesLevel2');
const apiRoutesLevel3_1 = require('./apiRoutesLevel3');
class apiRoutesLevel0 {
    constructor(token) {
        this._router = express.Router();
        this._mytoken = token;
        this._router.use((req, res, next) => {
            let myToken = req.cookies['access_token'];
            if (!myToken) {
                //there is no token, user unauthorized
                return res.json({
                    success: false,
                    message: 'User is not authorized - no token provided'
                });
            }
            else {
                //token provided                
                this._mytoken.verifyToken(myToken, function (err, decoded) {
                    if (err) {
                        return res.status(401).json({
                            success: false,
                            status: 'Failed to verify token'
                        });
                    }
                    else {
                        //token verified
                        //console.log("Decoded token:\n"+decoded.sub+"..."+decoded.permissions);
                        req.cookies['decodedToken'] = decoded;
                        next();
                    }
                });
            }
        });
        this._apiRoutes1 = new apiRoutesLevel1_1.apiRoutesLevel1();
        this._apiRoutes2 = new apiRoutesLevel2_1.apiRoutesLevel2();
        this._apiRoutes3 = new apiRoutesLevel3_1.apiRoutesLevel3();
        this._router.use('/1', this._apiRoutes1.returnRouter());
        this._router.use('/2', this._apiRoutes2.returnRouter());
        this._router.use('/3', this._apiRoutes3.returnRouter());
    }
    returnRouter() {
        return this._router;
    }
}
exports.apiRoutesLevel0 = apiRoutesLevel0;
//# sourceMappingURL=apiRoutesLevel0.js.map