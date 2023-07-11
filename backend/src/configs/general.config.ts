/* eslint-disable prettier/prettier */
import dotenv from "dotenv";
dotenv.config();


export const general = {
    PORT: parseInt(process.env.PORT || "3000"),
    DATABASE_URL: process.env.DATABASE_URL,
};
