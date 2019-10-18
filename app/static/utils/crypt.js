/* eslint-disable no-undef */
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';
import app from '../web/webConfig';
import { getHashCode } from './utils';

// Decrypt with the private key...
var decrypt = new JSEncrypt();
decrypt.setPrivateKey(app.privateKey);
var uncrypted = decrypt.decrypt(localStorage.getItem('rsa'));
console.log(uncrypted);