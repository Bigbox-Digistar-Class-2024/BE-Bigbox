import { Request, Response } from 'express';
import { EventService } from '../services/event.service';

export class CRMController {
    constructor(private eventService: EventService) {}

    async updateEventProgress(req: Request, res: Response) {
        try {
            // Pastikan 'progress' bisa diupdate
            const event = await this.eventService.updateEvent(req.params.eventId, { progress: req.body.progress });
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ error: 'Unable to update event progress' });
        }
    }

    async submitReport(req: Request, res: Response) {
        try {
            // Submit report logic
            res.status(200).json({ message: 'Report submitted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Unable to submit report' });
        }
    }
}
