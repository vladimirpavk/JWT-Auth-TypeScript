"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users_1 = require('../users');
const apiRoutesLevel0_1 = require('./apiRoutesLevel0');
class apiRoutes {
    constructor(token) {
        this._router = express.Router();
        this._users = new users_1.Users();
        this._token = token;
        this._router.use(bodyParser.urlencoded({
            extended: true
        }));
        this._router.use(cookieParser('signed-with-secret-key'));
        this._routes0 = new apiRoutesLevel0_1.apiRoutesLevel0(this._token);
        this._router.use('/restricted', this._routes0.returnRouter());
        this._router.post('/login', (req, res) => {
            let authData = this._users.authUser(req.body.username, req.body.password);
            if (authData.isAuthenticated) {
                //commented code is for production enviroment                                                     
                /*res.cookie('access-token', token.create(req.body.username, authData.roleid),{
                    httpOnly: true,
                    secure: true,
                    signed: true
                }).status(200).json({
                    success: true,
                    status: "User authenticated...",
                    token: 'bivsi_token'
                });*/
                let createdToken = this._token.createToken(req.body.username, authData.roleid);
                console.log(createdToken);
                res.cookie('access_token', createdToken).status(200).json({
                    success: true,
                    status: "User authenticated...",
                    token: 'bivsi_token'
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    status: "User NOT authenticated..."
                });
            }
        });
    }
    returnRouter() {
        return this._router;
    }
}
exports.apiRoutes = apiRoutes;
//# sourceMappingURL=apiRoutes.js.map