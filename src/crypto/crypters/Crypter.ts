export interface Crypter {
    encrypt: (src: Buffer) => void;
    decrypt: (src: Buffer) => void;
}