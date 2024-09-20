import Settings from "../models/setting.models";

export class SettingsService {
    async updateSettings(key: string, value: string) {
        return Settings.findOneAndUpdate({ key }, { value }, { new: true });
    }

    async getSettings(key: string) {
        return Settings.findOne({ key });
    }
}
