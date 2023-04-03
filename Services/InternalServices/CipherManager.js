import { RSA } from "react-native-rsa-native";

const CipherManager = {
    generateKeys: async () => {
        const keys = await RSA.generateKeys(4096);
        return keys;
    },

    encrypt: async (publicKey, plainTextMessage) => {
        const encryptedMessage = await RSA.encrypt(plainTextMessage, publicKey);
        return encryptedMessage;
    },

    decrypt: async (privateKey, encryptedMessage) => {
        const decryptedMessage = await RSA.decrypt(
            encryptedMessage,
            privateKey
        );
        return decryptedMessage;
    },
};

export default CipherManager;
