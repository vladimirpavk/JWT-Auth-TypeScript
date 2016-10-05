"use strict";
/// <reference path="typings/index.d.ts" />
const uuid = require('node-uuid');
const jToken = require('jsonwebtoken');
class MyToken {
    constructor() {
        this._secretKey = uuid.v4();
    }
    createToken(user, permission) {
        let claims = {
            sub: user,
            iss: 'https://i_issued_this.com',
            permissions: permission
        };
        return jToken.sign(claims, this._secretKey);
    }
    verifyToken(token, callback) {
        return jToken.verify(token, this._secretKey, callback);
    }
}
exports.MyToken = MyToken;
//# sourceMappingURL=mytoken.js.map