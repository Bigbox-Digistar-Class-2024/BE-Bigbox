import AuditLog from "../models/audit.models";

export class AuditLogService {
    async createLog(action: string, performedBy: string) {
        const log = new AuditLog({ action, performedBy, timestamp: new Date() });
        return log.save();
    }

    async getLogs() {
        return AuditLog.find();
    }
}