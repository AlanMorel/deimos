import { RecvOp } from "./constants/RecvOp";
import { SendOp } from "./constants/SendOp";

export default {
    name: "Deimos",
    version: 12,
    login: {
        host: "127.0.0.1",
        port: 20001
    },
    worlds: [
        {
            name: "Paperwood",
            channels: [
                {
                    host: "127.0.0.1",
                    port: 21001
                }, {
                    host: "127.0.0.1",
                    port: 21002
                }
            ]
        }
    ],
    settings: {
        logDebugs: true,
        logPackets: true,
        logQueries: false,
        loadMetadata: true,
        defaultAccountId: 1n
    },
    hash: "ce6ca622429e68b37650d519b326e293",
    block: {
        recv: [
            RecvOp.USER_SYNC,
            RecvOp.USER_CHAT,
            RecvOp.KEY_TABLE,
            RecvOp.LOG_SEND,
            RecvOp.NAMETAG_SYMBOL
        ],
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
