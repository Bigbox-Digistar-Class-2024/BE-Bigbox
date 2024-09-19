import { EventDocument } from "../models/event.models";
import Event from "../models/event.models";

export class EventService {
    static async findEventByTitle(title: string): Promise<EventDocument | null> {
        try {
            return await Event.findOne({ title });
        } catch (error) {
            throw new Error('Unable to find event by title');
        }
    }

    async createEvent(data: EventDocument): Promise<EventDocument> {
        const event = new Event(data);
        return event.save();
    }

    async updateEvent(eventId: string, data: Partial<any>): Promise<EventDocument | null> {  // Gunakan Partial<any>
        return Event.findByIdAndUpdate(eventId, data, { new: true });
    }

    async deleteEvent(eventId: string): Promise<EventDocument | null> {
        return Event.findByIdAndDelete(eventId);
    }

    async getEventsByDate(date: Date): Promise<EventDocument[]> {
        return Event.find({ date });
    }

    async subscribe(userId: string, eventId: string): Promise<EventDocument | null> {
        return Event.findByIdAndUpdate(eventId, { $addToSet: { participants: userId } }, { new: true });
    }

    async getAttendees(eventId: string): Promise<EventDocument | null> {
        return Event.findById(eventId).populate('participants');
    }

    async getEventsByLocation (location: string): Promise<EventDocument[]> {
        return Event.find({ location });
    } 

    async getEventsByType (type: string): Promise<EventDocument[]> {
        return Event.find({ type });
    }
    
}
