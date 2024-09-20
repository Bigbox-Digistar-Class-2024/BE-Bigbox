import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { UserDocument, UserInput } from '../models/user.models';

export class UserService {
    static findById: any;

    public async findAll() : Promise<UserDocument[]>{
        try{
            const users = await User.find();
            return users;
        }catch(error){
            throw error;
        }
    }
    public async findByEmail(email:any):Promise<UserDocument | null>{
        try{
            const user = await User.findOne({email});
            return user;
        }catch (error){
            throw error;
        }
    }

    public async create(userInput: UserInput): Promise<UserDocument>{
        try{
            const user = await User.create(userInput);
            return user;
        }catch (error){
            throw error;
        }
    }

    public async updateById(id: any, userInput: UserInput): Promise<UserDocument | null>{
        try{
            const user = await User.updateOne({_id: id}, userInput);
            const editeduser = await User.findOne({email: userInput.email});
            return editeduser;
        }catch (error){
            throw error;
        }
    }

    public async findById(id: any): Promise<UserDocument | null>{
        try{
            const user = await User.findById(id);
            return user;
        }catch(error){
            throw error
        }
    }

    public async delete(id : any): Promise<UserDocument | null>{
        try{
            const user= await User.findOneAndDelete({_id: id});
            return user;
        }catch(error){
            throw error
        }
    }

    public generateToken(user: UserDocument) {
        try{
            return jwt.sign({user_id:user.id, email:user.email},
                process.env.JWT_SECRET || "secret",
                {expiresIn: "5m"});

        }catch(error){
            throw error;
        }
    }

    async createUser(data: Partial<UserDocument>): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(data.password as string, 10);
        const user = new User({ ...data, password: hashedPassword });
        return user.save();
    }

    async updateUser(id: string, data: Partial<UserDocument>): Promise<UserDocument | null> {
        return User.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteUser(id: string): Promise<UserDocument | null> {
        return User.findByIdAndDelete(id);
    }

    async getUserByEmail(email: string): Promise<UserDocument | null> {
        return User.findOne({ email }).populate('events');
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.getUserByEmail(email);
        if (!user) return null;

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return null;

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        return token;
    }

    async getEventByUser (id: string): Promise<UserDocument | null> {
        return User.findById(id).populate('events');
    }
    
}

export default new UserService();