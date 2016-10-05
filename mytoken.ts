/// <reference path="typings/index.d.ts" />
import * as uuid from 'node-uuid';
import * as jToken from 'jsonwebtoken';

export class MyToken{

    private _secretKey: string;


    constructor(){

        this._secretKey=uuid.v4();

    }   

    public createToken(user: string, permission: number): string{
        
        let claims={
            sub: user,
            iss: 'https://i_issued_this.com',
            permissions: permission
        };

        return jToken.sign(claims, this._secretKey);
    } 

    public verifyToken(token: string, callback:any): any{
        return jToken.verify(token, this._secretKey, callback);
    }

   
}