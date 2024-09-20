import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { EventService } from '../services/event.service';

export class AdminCRMController {
    constructor(private eventService: EventService, private userService: UserService) {}

    async assignEventToCRM(req: Request, res: Response) {
        try {
            const event = await this.eventService.subscribe(req.body.userId, req.body.eventId);
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ error: 'Unable to assign event' });
        }
    }

    async editEvent(req: Request, res: Response) {
        try {
            const event = await this.eventService.updateEvent(req.params.eventId, req.body);
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ error: 'Unable to edit event' });
        }
    }

    async deleteEvent(req: Request, res: Response) {
        try {
            await this.eventService.deleteEvent(req.params.eventId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Unable to delete event' });
        }
    }
}
