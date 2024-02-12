import { Request, Response, NextFunction } from 'express';
import { auth } from '../models/mariadb';

export const Auth = {
    private: async (req:Request, res:Response, next: NextFunction) => {

        //Authorization success
        let success = false;
        
        console.log(req.headers.authorization);//To verify what was sent to the HEADERS

        if(req.headers.authorization){

            let hash = req.headers.authorization as string;
            //let decode:string = Buffer.from(hash, 'base64').toString();
            //let data:string[] = decode.split(':');           

            if(hash){
                let hasUser = await auth.findOne({
                    where: {
                        //email: data[0],
                        password: hash
                    }
                });
                if(hasUser){
                    success = true;
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