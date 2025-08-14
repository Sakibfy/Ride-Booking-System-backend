import dotenv from "dotenv";

dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUND: string,
    JWT_ACCESS_SECRET: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_SECRET: string,
    JWT_REFRESH_EXPIRES: string,
    SUPER_ADMIN_EMAIL : string,
    SUPER_ADMIN_PASSWORD: string,
    EXPRESS_SESSION_SECRET : string,
    FRONTEND_URL : string,
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "JWT_ACCESS_SECRET","JWT_ACCESS_EXPIRES", "BCRYPT_SALT_ROUND", "SUPER_ADMIN_PASSWORD","SUPER_ADMIN_EMAIL", "JWT_REFRESH_EXPIRES", "JWT_REFRESH_SECRET",  "EXPRESS_SESSION_SECRET","FRONTEND_URL"  ];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            console.log('key', key);
            throw new Error(`Missing require environment variabl  ${key}`)
        }
    })

    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL!,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        JWT_ACCESS_SECRET :process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES :process.env.JWT_ACCESS_EXPIRES as string,
        BCRYPT_SALT_ROUND :process.env.BCRYPT_SALT_ROUND as string,
        JWT_REFRESH_SECRET :process.env.JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRES :process.env.JWT_REFRESH_EXPIRES as string,
        SUPER_ADMIN_EMAIL :process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD :process.env.SUPER_ADMIN_PASSWORD as string,
        EXPRESS_SESSION_SECRET :process.env.EXPRESS_SESSION_SECRET as string,
        FRONTEND_URL :process.env.FRONTEND_URL as string,
    }
}

export const envVars = loadEnvVariables()