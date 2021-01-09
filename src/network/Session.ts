import * as net from 'net';
import { BitConverter } from '../crypto/BitConverter';
import { BufferStream } from '../crypto/BufferStream';
import { Cipher } from '../crypto/Cipher';
import { RequestVersionPacket } from '../packets/RequestVersionPacket';
import { Packet } from '../tools/Packet';

export class Session {
    version: number = 12;
    blockIV: number = 12;

    id: number;
    socket: net.Socket;

    ivRecv: number;
    ivSend: number;

    recvCipher: Cipher;
    sendCipher: Cipher;

    bufferStream: BufferStream;

    constructor(id: number, socket: net.Socket) {
        this.id = id;
        this.socket = socket;

        this.ivRecv = BitConverter.toInt(Cipher.generateIv());
        this.ivSend = BitConverter.toInt(Cipher.generateIv());

        this.recvCipher = Cipher.decryptor(this.version, this.ivRecv, this.blockIV);
        this.sendCipher = Cipher.encryptor(this.version, this.ivSend, this.blockIV);

        this.bufferStream = new BufferStream();
    }

    public send(packet: Packet): void {
        packet = this.sendCipher.transform(packet.buffer);
        console.log("[SEND]: " + packet.toString());
        this.socket.write(packet.toArray());
    }

    public sendHandshake(type: number): void {
        let packet = RequestVersionPacket.handshake(this.version, this.ivRecv, this.ivSend, this.blockIV, type);
        packet = this.sendCipher.writeHeader(packet.toArray());

        console.log("Sending handshake:");
        console.log(packet.toString());

        this.socket.write(packet.buffer);
    }
}