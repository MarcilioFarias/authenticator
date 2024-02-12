import { Request, Response } from "express";
import { auth } from '../models/mariadb';
import { encode, decode } from 'hi-base64';


export const ping = async (req: Request, res: Response)=> {

    res.json({pong: true});
};

export const register = async (req: Request, res: Response) => {

    /*
    let {password} = req.body;
    console.log('A senha e: ', password);
    let enTest = encode(password);
    console.log(enTest);    

    let deTest = Buffer.from(enTest, 'base64').toString();
    console.log(deTest); 
    */
    
   if(req.body.user && req.body.email && req.body.password) {        
        
        let {user, email, password} = req.body;
        let hash = encode(password);

        password = hash;

        let hasUser = await auth.findOne({where: {user}});

        if(!hasUser){
            let newRegister = await auth.create({
                user, email, password
            });

            res.status(201);
            res.json({id: newRegister.id});
        } else {
            res.json({error: 'Try a different e-mail'});
        }        
        
    } else {
        console.log('Fill up the form');
    }  
};

export const login = async (req: Request, res: Response) => {

    let user:string = req.body.user;
    let email:string = req.body.email;
    let password:string = req.body.password;

    let checkUser = await auth.findOne({
        where: {user}
     });

    if(checkUser){

        res.json({status: true});
        

    } else {
        res.json({status: false});
    }
    
};

export const list = async (req: Request, res: Response) => {

    let data = await auth.findAll();
    let listEmails:string[] = [];   

    for(let i in data) {
              
        listEmails.push(data[i].email);
    }
    
    res.json({listEmails});
    
    
};

export const listPassword = async (req: Request, res:Response) => {

    let {id} = req.params;
    let data = await auth.findByPk(id);

    
    

    res.json({id: id});
};