import {Request, Response} from 'express';
import { UserDocument, UserInput } from '../models/user.models';
import userServices from '../services/user.service'
import bcrypt from 'bcrypt';
class UserController{

    public async getEventsByUser(req: Request, res:Response){
        try {
            const userExists: UserDocument | null = await userServices.findByEmail(req.params.email);
            if(userExists){
                return res.status(200).json(userExists.events);
            }else{
                return res.status(400).json({message: "User not found"});
            }
        }catch(error){
            return res.status(500).json(error);
        }
    }

    public async create(req: Request, res:Response){
        try {
            const userExists: UserDocument | null = await userServices.findByEmail(req.body.email);
            req.body.password = await bcrypt.hash(req.body.password, 10);
            if(userExists){
                return res.status(400).json({message: "User already exists"});
            }
            else{
                return res.status(400).json({message: "Invalid role"})
            }
        }catch(error){
            return res.status(500).json(error);
        }
        
    }
    
    public async updateById(req: Request, res:Response){
        try {
            const userExists: UserDocument | null = await userServices.findById(req.params.id);
            if(userExists){
                if(req.body.password){
                    req.body.password = await bcrypt.hash(req.body.password, 10);
                }
                const user = await userServices.updateById(req.params.id,req.body as UserInput)
                
                return res.status(200).json(user);    
            }else{
                return res.status(400).json({message: "user not created"})
            }
        }catch(error){
            return res.status(500).json(error);
        }
    }

    public async delete(req: Request, res:Response){
        try {
            const userExists: UserDocument | null = await userServices.findById(req.params.id);
            if(userExists){
                if (req.body.password == req.body.confpassword){
                    const user = await userServices.findById(req.params.id);
                    if (await bcrypt.compare(req.body.password,String(user?.password))){
                        const user = await userServices.delete(req.params.id)
                        return res.status(204).json(user);    
                    }
                    return res.status(500).json("Incorrect password");    
                }else{
                    return res.status(500).json("Incorrect password");    
                }
            }else{
                return res.status(401).json({message: "User does not exist"})
            }

            
        }catch(error){
            return res.status(500).json(error);
        }
    }

    public async login(req : Request, res : Response){
        try {
            const userExists: UserDocument | null = await userServices.findByEmail(req.body.email);
            if(userExists){
                if(await bcrypt.compare(req.body.password, userExists.password)){
                    const token = userServices.generateToken(userExists)
                    return res.status(200).json(token);    
                }
                return res.status(401).json({message:"Wrong password"});
            }else{
                return res.status(401).json({message: "User does not exist"})
            }
        }catch(error){
            return res.status(500).json(error);
        }
    }

}

export default new UserController();