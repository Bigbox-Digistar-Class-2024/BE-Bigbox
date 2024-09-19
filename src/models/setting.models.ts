import mongoose, { Document } from 'mongoose';

export interface SettingsInput {
    key: string;
    value: string;
}

export interface SettingsDocument extends SettingsInput, Document {}

const settingsSchema = new mongoose.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true }
}, { timestamps: true });

const Settings = mongoose.model<SettingsDocument>('Settings', settingsSchema);
export default Settings;
