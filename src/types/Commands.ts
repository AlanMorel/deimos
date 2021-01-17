import { ChannelSession } from "../network/sessions/ChannelSession";
import { ChatPacket } from "../packets/ChatPacket";
import { ChatType } from "./ChatType";

export class Commands {

    public static process(session: ChannelSession, command: string): boolean {
        const args = command.toLowerCase().split(" ", 2);

        switch (args[0]) {
            case "coord":
                const message = session.player.coord.toString();
                session.send(ChatPacket.send(session, message, ChatType.All));
                return true;
        }

        return false;
    }
}
