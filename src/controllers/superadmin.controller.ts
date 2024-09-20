import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuditLogService } from '../services/audit.service';
import { SettingsService } from '../services/settings.service';

export class SuperAdminController {
    constructor(
        private userService: UserService,
        private auditLogService: AuditLogService,
        private settingsService: SettingsService
    ) {}

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body);
            await this.auditLogService.createLog('User created', req.body.performedBy);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Unable to create user' });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Unable to update user' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            await this.userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Unable to delete user' });
        }
    }

    async viewAuditLogs(req: Request, res: Response) {
        try {
            const logs = await this.auditLogService.getLogs();
            res.status(200).json(logs);
        } catch (error) {
            res.status(500).json({ error: 'Unable to retrieve audit logs' });
        }
    }

    async updateSettings(req: Request, res: Response) {
        try {
            const setting = await this.settingsService.updateSettings(req.body.key, req.body.value);
            res.status(200).json(setting);
        } catch (error) {
            res.status(500).json({ error: 'Unable to update settings' });
        }
    }
}
