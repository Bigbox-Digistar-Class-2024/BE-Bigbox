// src/services/UserService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/user.models';

export class UserService {
    static findById: any;
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
}
