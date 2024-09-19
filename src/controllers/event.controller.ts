// import { Request, Response } from 'express';
// import Event, { EventDocument, EventInput } from '../models/event.models';
// import { UserDocument, UserInput } from '../models/user.models';
// import userService from '../services/user.service';
// import eventService from '../services/event.service';
// import userController from './user.controller';
// import { title } from 'process';

// class EventController {
//     public async createEvent(req: Request, res: Response) {
//         try {
//             const eventData : EventInput = req.body;
//             const userId = req.body.loggedUser.user_id;
//             const user = await userService.findById(userId);

//             if (!user) {
//                 return res.status(401).json({ message: 'User not found' });
//             }

//             // Verificar que el usuario tenga permiso para crear eventos
//             if (user.role !== 'organizer') {
//                 return res.status(403).json({ message: 'Unauthorized: Only organizers can create events' });
//             }
//             const createdEvent : EventDocument|null = await eventService.findEventByTitle(eventData.title);
//             if (createdEvent!=null){
//                 return res.status(400).json(createdEvent);
//             }
//             eventData.organizer= userId;
//             // Crear el evento
//             const event: EventDocument = await eventService.createEvent(eventData);
//             user.events.push(event);
//             userService.updateById(user.id,user)
//             return res.status(200).json(event);
                   
//         } catch (error) {
//             return res.status(500).json(error);
//         }
//     }

//     public async getEventsByDate(req: Request, res: Response): Promise<void> {
//         try {
//             const { date } = req.query;

//             const events: EventDocument[] = await Event.find({ date });

//             res.status(200).json(events);
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }

//     public async getEventsByLocation(req: Request, res: Response): Promise<void> {
//         try {
//             const { location } = req.query;

//             const events: EventDocument[] = await Event.find({ location });

//             res.status(200).json(events);
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }

//     public async getEventsByType(req: Request, res: Response): Promise<void> {
//         try {
//             const { type } = req.query;

//             const events: EventDocument[] = await Event.find({ type });

//             res.status(200).json(events);
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }

//     public async getAllEvents(req: Request, res: Response) {
//         try {
//             const events: EventDocument[] = await Event.find();
//             return res.status(200).json(events);
//         } catch (error) {
//             return res.status(500).json(error);
//         }
//     }


//     public async updateEvent(req: Request, res: Response) {
//         try {
//             const eventId = req.params.event_id;
//             const eventData = req.body;

//             const userId = req.body.loggedUser.user_id;

//             const user: UserDocument | null = await userService.findById(userId);
//             if (!user || user.role !== 'organizer') {
//                 return res.status(403).json({ message: 'You are not authorized to edit this event' });
                
//             }

//             // Verificar si el evento existe y si el usuario es el organizador
//             const event: EventDocument | null = await eventService.getEventById(eventId);
//             if (!event) {
//                 res.status(404).json(event);
//                 return;
//             }
//             const updatedEvent = await eventService.updateEvent(eventId,eventData as EventInput)
//             var updatedEvents = await user.events.filter(e=>e.title !== event.title);
//             if(updatedEvent!= null){
//                 user.events=updatedEvents;
//                 user.events.push(updatedEvent);
//                 userService.updateById(user.id,user)
//                 res.status(200).json(updatedEvent);
//             }
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }


//     public async deleteEvent(req: Request, res: Response): Promise<void> {
//         try {
//             const eventId = req.params.id;

//             const userId = req.body.loggedUser.user_id;

//             const user: UserDocument | null = await userService.findById(userId);
//             if (!user || user.role !== 'organizer') {
//                 res.status(403).json({ message: 'You are not authorized to delete this event' });
//                 return;
//             }

//             // Verificar si el evento existe y si el usuario es el organizador
//             const event: EventDocument | null = await Event.findOne({ _id: eventId, organizer: userId });
//             if (!event) {
//                 res.status(404).json({ message: 'Event not found or you are not authorized to delete this event' });
//                 return;
//             }

//             await Event.findByIdAndDelete(eventId);
//             res.status(204).json();
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }

//     public async getAttendees(req: Request, res: Response): Promise<void> {
//         try{

            
//             const eventId = req.params.event_id;


//             const userId = req.body.loggedUser.user_id;

//             const user: UserDocument | null = await userService.findById(userId);
//             if (!user || user.role !== 'organizer') {
//                 res.status(403).json({ message: 'You are not authorized to delete this event' });
//                 return;
//             }

//             const event: EventDocument | null = await Event.findOne({ _id: eventId, organizer: userId });
//             if (!event) {
//                 res.status(404).json({ message: 'Event not found or you are not authorized to delete this event' });
//                 return;
//             }


//             const attendees = await eventService.getAttendees(eventId);

//             res.status(200).json(attendees);
//         }catch(error){
//             res.status(500).json(error);
//         }
//     }


//     public async subscribe(req: Request, res: Response): Promise<void> {
//         try {
//             const eventId = req.params.event_id;

//             const event : EventDocument | null = await eventService.getEventById(eventId);

//             if (!event) {
//                 res.status(404).json({ message: 'Event not found' });
//                 return;
//             }

//             const userId = req.body.loggedUser.user_id;

//             const user: UserDocument | null = await userService.findById(userId);

//             const isParticipant = event.participants.find(participant => participant.toString() === userId);

            
//             if(isParticipant){
//                 res.status(400).json({ message: 'You are already subscribed to this event' });
//                 return;
//             }
            

//             event.participants.push(user?._id);

//             //await eventService.updateEvent(eventId, event);
//             await event.save();

//             user?.events.push(event);

//             await user?.save()

//             res.status(200).json({message: 'You have subscribed to the event'});

//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }
// }

// export default new EventController();
