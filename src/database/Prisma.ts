import Config from "@/Config";
import { Logger } from "@/tools/Logger";
import { PrismaClient } from "@prisma/client";

const credentials = Config.database;

const DATABASE_URL = `mysql://${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.table}`;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: DATABASE_URL
        }
    },
    log: [
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
});

prisma.$on("warn", e => {
    Logger.error("Prisma warning: ");
    Logger.error(e.message);
});

prisma.$on("error", e => {
    Logger.critical("Prisma error: ");
    Logger.critical(e.message);
});

export default prisma;
