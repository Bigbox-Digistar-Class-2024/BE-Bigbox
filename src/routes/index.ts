// src/routes/index.ts
import { Express } from "express";
import auth from "../middlewares/auth";
import { SuperAdminController } from "../controllers/superadmin.controller";
import { AdminCRMController } from "../controllers/admin.controller";
import { CRMController } from "../controllers/crm.controller";
import { UserService } from "../services/user.service";
import { AuditLogService } from "../services/audit.service";
import { SettingsService } from "../services/settings.service";
import { EventService } from "../services/event.service";
import userController from "../controllers/user.controller";

export default function setupRoutes(app: Express) {
    const userService = new UserService();
    const auditLogService = new AuditLogService();
    const settingsService = new SettingsService();
    const eventService = new EventService();

    const superAdminController = new SuperAdminController(userService, auditLogService, settingsService);
    const adminCRMController = new AdminCRMController(eventService, userService);
    const crmController = new CRMController(eventService);

    // Super Admin routes
    app.post('/super-admin/users', superAdminController.createUser);
    app.put('/super-admin/users/:id', superAdminController.updateUser);
    app.delete('/super-admin/users/:id', superAdminController.deleteUser);
    app.get('/super-admin/audit-logs', superAdminController.viewAuditLogs);
    app.put('/super-admin/settings', superAdminController.updateSettings);
    // app.post('/super-admin/backup', superAdminController.performBackup);

    // Admin CRM routes
    app.post('/admin-crm/events/assign', auth, adminCRMController.assignEventToCRM);
    app.put('/admin-crm/events/:eventId', auth, adminCRMController.editEvent);
    app.delete('/admin-crm/events/:eventId', auth, adminCRMController.deleteEvent);

    // CRM routes
    app.put('/crm/events/:eventId/progress', auth, crmController.updateEventProgress);
    app.post('/crm/events/:eventId/report', auth, crmController.submitReport);

    // General User and Event routes
    app.post('/users', userController.create);  // Assuming general user creation doesn't require auth
    app.put('/users/:id', auth, userController.updateById);
    app.delete('/users/:id', auth, userController.delete);
    app.get('/users/:email/events', auth, userController.getEventsByUser);
    app.post('/login', auth, userController.login);

    app.post('/event/create', auth, eventService.createEvent);
    app.get('/events/filter/date', auth, eventService.getEventsByDate);
    app.get('/events/filter/location', auth, eventService.getEventsByLocation);
    app.get('/events/filter/type', auth, eventService.getEventsByType);
    app.put('/event/update/:event_id', auth, eventService.updateEvent);
    app.delete('/event/delete/:id', auth, eventService.deleteEvent);
    // app.post('/event/:event_id/subscribe', auth, eventService.subscribe);
    app.get('/event/:event_id/attendees', auth, eventService.getAttendees);
}
