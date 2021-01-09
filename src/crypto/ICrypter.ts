export interface ICrypter {
    encrypt: (src: Buffer) => void;
    decrypt: (src: Buffer) => void;
}