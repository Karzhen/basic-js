const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    const result = [];
    const upperMessage = message.toUpperCase();
    const upperKey = key.toUpperCase();

    for (let i = 0, j = 0; i < message.length; i++) {
      if (this.alphabet.includes(upperMessage[i])) {
        const messageIndex = this.alphabet.indexOf(upperMessage[i]);
        const keyIndex = this.alphabet.indexOf(upperKey[j % key.length]);
        const cipherIndex = (messageIndex + keyIndex) % this.alphabet.length;

        result.push(this.alphabet[cipherIndex]);
        j++;
      } else {
        result.push(upperMessage[i]);
      }
    }

    return this.direct ? result.join('') : result.reverse().join('');
  }
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    const result = [];
    const upperEncryptedMessage = encryptedMessage.toUpperCase();
    const upperKey = key.toUpperCase();

    for (let i = 0, j = 0; i < encryptedMessage.length; i++) {
      if (this.alphabet.includes(upperEncryptedMessage[i])) {
        const encryptedIndex = this.alphabet.indexOf(upperEncryptedMessage[i]);
        const keyIndex = this.alphabet.indexOf(upperKey[j % key.length]);
        const decipherIndex = (encryptedIndex - keyIndex + this.alphabet.length) % this.alphabet.length;

        result.push(this.alphabet[decipherIndex]);
        j++;
      } else {
        result.push(upperEncryptedMessage[i]);
      }
    }

    return this.direct ? result.join('') : result.reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
