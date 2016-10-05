/// <reference path="typings/index.d.ts" />
import * as express from 'express';
import * as morgan from 'morgan';
import { apiRoutes } from './routes/apiRoutes';
import { MyToken } from './mytoken';

export class App {    
    private _app: express.Express;
    private _port: number;
    private _globalToken: MyToken;
    private _router: apiRoutes;

    constructor(port:number){
        this._app = express();
        this._port = port;
        this._globalToken = new MyToken();
        this._router = new apiRoutes(this._globalToken);        
    }

    public listen()
    {
        this._app.use('/', this._router.returnRouter());

        console.log("Server is listening at "+this._port);
        this._app.listen(this._port);
    }

}

    
