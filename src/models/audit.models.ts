import mongoose, { Document } from 'mongoose';

export interface AuditLogInput {
    action: string;
    performedBy: string;
    timestamp: Date;
}

export interface AuditLogDocument extends AuditLogInput, Document {}

const auditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    performedBy: { type: String, required: true },
    timestamp: { type: Date, required: true }
}, { timestamps: true });

const AuditLog = mongoose.model<AuditLogDocument>('AuditLog', auditLogSchema);
export default AuditLog;
