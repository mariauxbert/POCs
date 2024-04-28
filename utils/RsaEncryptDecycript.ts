// rsaUtility.ts
import { RSA } from 'react-native-rsa-native';

interface RSAKeys {
  publicKey: string;
  privateKey: string;
}

interface rsaUtility {
  generateKeys: (keySize?: number) => Promise<RSAKeys | null>;
  encryptMessage: (message: string, publicKey: string) => Promise<string | null>;
  decryptMessage: (encodedMessage: string, privateKey: string) => Promise<string | null>;
}

const rsaUtility: rsaUtility = {
  generateKeys: async (keySize: number = 4096): Promise<RSAKeys | null> => {
    try {
      const keys = await RSA.generateKeys(keySize);
      console.log('Keys generated successfully:');

      
      return {publicKey:keys.public, privateKey:keys.private};
    } catch (error) {
      throw new Error('Error generating keys:', error);
      return null;
    }
  },

  encryptMessage: async (message: string, publicKey: string): Promise<string | null> => {
    try {
      // Check if message and publicKey are not null or undefined
      if (!message || !publicKey) {
        console.error('Message or publicKey is null or undefined');
        return null;
      }
  
      const encodedMessage = await RSA.encrypt(message, publicKey);
      console.log('Message encrypted successfully:', encodedMessage);
      return encodedMessage;
    } catch (error) {
      throw new Error('Error encrypting message:', error);
      return null;
    }
  },
  

  decryptMessage: async (encodedMessage: string, privateKey: string): Promise<string | null> => {
    try {
      // Check if encodedMessage and privateKey are not null or undefined
      if (!encodedMessage || !privateKey) {
        console.error('encodedMessage or privateKey is null or undefined');
        return null;
      }
  
      const decryptedMessage = await RSA.decrypt(encodedMessage, privateKey);
      console.log('Message decrypted successfully:', decryptedMessage);
      return decryptedMessage;
    } catch (error) {
      console.error('Error decrypting message:', error);
      return null;
    }
  },
};

export default rsaUtility;
