"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncEmails = void 0;
const imap_simple_1 = __importDefault(require("imap-simple"));
const mailparser_1 = require("mailparser");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("IMAP_USER:", process.env.IMAP_USER);
console.log("IMAP_HOST:", process.env.IMAP_HOST);
console.log("IMAP_PASS:", process.env.IMAP_PASS ? "Loaded ✅" : "Missing ❌");
const imapConfig = {
    imap: {
        user: process.env.IMAP_USER || '',
        password: process.env.IMAP_PASSWORD || '',
        host: process.env.IMAP_HOST || '',
        port: 993,
        tls: true,
        authTimeout: 3000,
    },
};
const syncEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📬 IMAP Service is running..."); // Added log message
        const connection = yield imap_simple_1.default.connect(imapConfig);
        yield connection.openBox('INBOX');
        connection.on('mail', (numNewMail) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`New email received: ${numNewMail}`);
            const messages = yield connection.search(['ALL'], { bodies: ['HEADER', 'TEXT'], struct: true });
            for (let item of messages) {
                const all = item.parts.find(part => part.which === 'TEXT');
                if (all) {
                    const email = yield (0, mailparser_1.simpleParser)(all.body);
                    console.log(`Email Subject: ${email.subject}`);
                }
            }
        }));
    }
    catch (error) {
        console.error('IMAP Sync Error:', error);
    }
});
exports.syncEmails = syncEmails;
// import Imap, { ImapSimpleOptions } from 'imap-simple';
// import { simpleParser } from 'mailparser';
// import dotenv from 'dotenv';
// dotenv.config();
// // Debugging: Check if environment variables are loaded
// console.log(`IMAP_USER: ${process.env.IMAP_USER}`);
// console.log(`IMAP_HOST: ${process.env.IMAP_HOST}`);
// console.log(`IMAP_PASS: Loaded ✅`); // Never print actual passwords
// const imapConfig: ImapSimpleOptions = {
//     imap: {
//         user: process.env.IMAP_USER || '',
//         password: process.env.IMAP_PASS || '',
//         host: process.env.IMAP_HOST || '',
//         port: 993,
//         tls: true,
//         tlsOptions: { rejectUnauthorized: false },
//         authTimeout: 3000,
//         debug: (msg: string) => console.log("📌 IMAP Debug:", msg),
//     },
// };
// export const syncEmails = async () => {
//     try {
//         console.log("📬 IMAP Service is running...");
//         console.log("⏳ Attempting IMAP connection...");
//         const connection = await Imap.connect(imapConfig);
//         console.log("✅ IMAP Connected!");
//         await connection.openBox('INBOX');
//         console.log("📥 INBOX Opened!");
//         // Fetch emails manually for debugging
//         const messages = await connection.search(['ALL'], { bodies: ['HEADER', 'TEXT'], struct: true });
//         if (messages.length === 0) {
//             console.log("⚠️ No emails found. Try sending a test email to yourself.");
//         } else {
//             console.log(`📩 Total emails found: ${messages.length}`);
//             for (let item of messages) {
//                 const all = item.parts.find(part => part.which === 'TEXT');
//                 if (all) {
//                     const email = await simpleParser(all.body);
//                     console.log(`📜 Email Subject: ${email.subject}`);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('❌ IMAP Sync Error:', error);
//     }
// };
// // Ensure the function runs immediately when this file is executed
// syncEmails();
