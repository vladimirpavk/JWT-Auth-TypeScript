import * as express from 'express';

import { MyToken } from '../mytoken';
import { apiRoutesLevel1 } from './apiRoutesLevel1';
import { apiRoutesLevel2 } from './apiRoutesLevel2';
import { apiRoutesLevel3 } from './apiRoutesLevel3';

export class apiRoutesLevel0{
    
    private _router: express.Router;
    private _mytoken: MyToken;

    private _apiRoutes1: apiRoutesLevel1;
    private _apiRoutes2: apiRoutesLevel2;
    private _apiRoutes3: apiRoutesLevel3;

    constructor(token: MyToken){
        
        this._router=express.Router();
        this._mytoken=token;

        this._router.use((req,res,next)=>{
    
            let myToken=req.cookies['access_token'];        
            
            if(!myToken){
                //there is no token, user unauthorized
                return res.json({
                            success: false,
                            message: 'User is not authorized - no token provided'
                        });
            } 
            else{
                //token provided                
                this._mytoken.verifyToken(myToken, function(err, decoded){
                    if(err){
                        return res.status(401).json({
                                    success: false,
                                    status: 'Failed to verify token'                  
                        });
                    }
                    else{
                        //token verified
                        //console.log("Decoded token:\n"+decoded.sub+"..."+decoded.permissions);
                        req.cookies['decodedToken'] = decoded;                         
                        next();
                    }   
                });             
                }        
            });
           
        this._apiRoutes1=new apiRoutesLevel1();
        this._apiRoutes2=new apiRoutesLevel2();
        this._apiRoutes3=new apiRoutesLevel3();
        
        this._router.use('/1', this._apiRoutes1.returnRouter());
        this._router.use('/2', this._apiRoutes2.returnRouter());
        this._router.use('/3', this._apiRoutes3.returnRouter());

    }

    public returnRouter(){
        return this._router;
    }
}