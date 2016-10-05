"use strict";
/// <reference path="typings/index.d.ts" />
const express = require('express');
const apiRoutes_1 = require('./routes/apiRoutes');
const mytoken_1 = require('./mytoken');
class App {
    constructor(port) {
        this._app = express();
        this._port = port;
        this._globalToken = new mytoken_1.MyToken();
        this._router = new apiRoutes_1.apiRoutes(this._globalToken);
    }
    listen() {
        this._app.use('/', this._router.returnRouter());
        console.log("Server is listening at " + this._port);
        this._app.listen(this._port);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map