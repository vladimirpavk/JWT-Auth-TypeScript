import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { Users } from '../users';
import { MyToken } from '../mytoken';

import { apiRoutesLevel0 } from './apiRoutesLevel0';

export class apiRoutes{

    private _router: express.Router;
    private _users: Users;
    private _token: MyToken;

    private _routes0: apiRoutesLevel0;

    constructor(token: MyToken){

        this._router=express.Router();
        this._users=new Users();
        this._token=token;

        this._router.use(bodyParser.urlencoded({
            extended: true
        }));

        this._router.use(cookieParser('signed-with-secret-key'));

        this._routes0=new apiRoutesLevel0(this._token);        
               
        this._router.use('/restricted', this._routes0.returnRouter());

        this._router.post('/login', (req, res)=>{
            let authData=this._users.authUser(req.body.username, req.body.password);
             
             if( authData.isAuthenticated ){      
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
                let createdToken=this._token.createToken(req.body.username, authData.roleid);
                console.log(createdToken);
                res.cookie('access_token', createdToken).status(200).json({
                    success: true,
                    status: "User authenticated...",
                    token: 'bivsi_token'
                });                          
            }
            else{
                res.status(401).json({
                    success: false,
                    status: "User NOT authenticated..."           
                });  
            }      
        })
    }

    public returnRouter(){
        return this._router;
    }

} 