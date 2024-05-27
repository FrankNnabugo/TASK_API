import * as dotEnv from "dotenv"


const configFile = "./.env"
if (configFile) {
    dotEnv.config({ path: configFile });
}
else{ throw new Error("unable to load values from env file")}


export const EnvFile= {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRY_DATE: process.env.ACCESS_TOKEN_EXPIRY_DATE,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY_DATE : process.env.REFRESH_TOKEN_EXPIRY_DATE 
}
