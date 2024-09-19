import mongoose, { Document } from 'mongoose';

export interface EventInput {
    title: string;
    description: string;
    date: Date;
    location: string;
    type: string;
    organizer: string;
    participants: mongoose.Types.ObjectId[];
}

export interface EventDocument extends EventInput, Document {
    createdAt: Date;
    updatedAt: Date;
}

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    organizer: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Event = mongoose.model<EventDocument>('Event', eventSchema);
export default Event;
