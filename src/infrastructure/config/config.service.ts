require('dotenv').config();

export class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) {}

    public getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) console.log(`Missing config: ${key}`);
        return value;
    }
}

const configService = new ConfigService(process.env);

export { configService };
