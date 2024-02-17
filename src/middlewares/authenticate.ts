import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { auth } from '../models/mariadb';

dotenv.config();

export const Auth = {
    private: async (req:Request, res:Response, next: NextFunction) => {

        //Authorization success
        let success = false;
        
        console.log(req.headers.authorization);//To verify what was sent to the HEADERS

        if(req.headers.authorization){

            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer') {
                try {
                   const decoded = JWT.verify(
                        token,
                        process.env.JWT_TOKEN as string
                    );
                    success = true;
                    console.log('DECODED: ', decoded);
                } catch(error) {
                   // console.log('TOKEN ERROR: ', error);
                }
            }
        }        

        if(success){
            next();
        } else {
            res.status(403);//Not authorized code
            res.json({error: 'Access denied '});
        }
    }
}