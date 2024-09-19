import mongoose, { Document } from 'mongoose';
import { EventDocument } from './event.models';

export interface UserInput {
    name: string;
    email: string;
    password: string;
    role: 'superadmin' | 'admin' | 'crm' | 'user';
    events: EventDocument[];
}

export interface UserDocument extends UserInput, Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin', 'crm', 'user'], default: 'user' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
}, { timestamps: true });

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
