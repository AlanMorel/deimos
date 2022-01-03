import dotenv from "dotenv";
import { RecvOp } from "./constants/RecvOp";
import { SendOp } from "./constants/SendOp";

dotenv.config();

export default {
    name: process.env.NAME ?? "Deimos",
    version: 12,
    login: {
        host: process.env.LOGIN_SERVER_HOST ?? "0.0.0.0",
        port: parseInt(process.env.LOGIN_SERVER_PORT ?? "20001")
    },
    worlds: [
        {
            name: "Paperwood",
            channels: [
                {
                    host: "0.0.0.0",
                    port: 21001
                },
                {
                    host: "0.0.0.0",
                    port: 21002
                }
            ]
        },
        {
            name: "Slimewood",
            channels: [
                {
                    host: "0.0.0.0",
                    port: 21003
                },
                {
                    host: "0.0.0.0",
                    port: 21004
                }
            ]
        },
        {
            name: "Waterwood",
            channels: [
                {
                    host: "0.0.0.0",
                    port: 21005
                },
                {
                    host: "0.0.0.0",
                    port: 21006
                }
            ]
        }
    ],
    settings: {
        defaultAccountId: 1n,
        logDebugs: (process.env.FILE_HASH ?? "false") === "true",
        logPackets: (process.env.LOG_PACKETS ?? "false") === "true",
        logQueries: (process.env.LOG_QUERIES ?? "false") === "true",
        logPrefix: (process.env.LOG_PREFIX ?? "false") === "true",
        logTimestamps: (process.env.LOG_TIMESTAMP ?? "false") === "true",
        loadMetadata: (process.env.LOAD_METADATA ?? "false") === "true",
        timestampOptions: {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        } as Intl.DateTimeFormatOptions
    },
    database: {
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT || "3306"),
        username: process.env.DATABASE_USERNAME || "root",
        passsword: process.env.DATABASE_PASSWORD || "",
        database: process.env.DATABASE_TABLE || "deimos"
    },
    hash: process.env.FILE_HASH ?? "",
    block: {
        recv: [RecvOp.USER_SYNC, RecvOp.USER_CHAT, RecvOp.KEY_TABLE, RecvOp.LOG_SEND, RecvOp.NAMETAG_SYMBOL],
        send: [
            SendOp.USER_SYNC,
            SendOp.PROXY_GAME_OBJ,
            SendOp.USER_CHAT,
            SendOp.NPC_CONTROL,
            SendOp.CHARACTER_LIST,
            SendOp.KEY_TABLE,
            SendOp.STAT,
            SendOp.EMOTION,
            SendOp.ITEM_INVENTORY,
            SendOp.FIELD_PORTAL,
            SendOp.SERVER_ENTER,
            SendOp.USER_ENV,
            SendOp.FIELD_ADD_USER,
            SendOp.MARKET_INVENTORY,
            SendOp.FURNISHING_INVENTORY,
            SendOp.BUDDY
        ]
    }
};
