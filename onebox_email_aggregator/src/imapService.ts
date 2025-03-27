import Imap, { ImapSimpleOptions } from 'imap-simple';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';

dotenv.config();

console.log("IMAP_USER:", process.env.IMAP_USER);
console.log("IMAP_HOST:", process.env.IMAP_HOST);
console.log("IMAP_PASS:", process.env.IMAP_PASS ? "Loaded ✅" : "Missing ❌");


const imapConfig: ImapSimpleOptions = {
    imap: {
      user: process.env.IMAP_USER || '',
      password: process.env.IMAP_PASSWORD || '',
      host: process.env.IMAP_HOST || '',
      port: 993,
      tls: true,
      authTimeout: 3000,
    },
};

export const syncEmails = async () => {
    try {
        console.log("📬 IMAP Service is running..."); // Added log message
        const connection = await Imap.connect(imapConfig);
        await connection.openBox('INBOX');

        connection.on('mail', async (numNewMail) => {
            console.log(`New email received: ${numNewMail}`);
            const messages = await connection.search(['ALL'], { bodies: ['HEADER', 'TEXT'], struct: true });
            for (let item of messages) {
                const all = item.parts.find(part => part.which === 'TEXT');
                if (all) {
                    const email = await simpleParser(all.body);
                    console.log(`Email Subject: ${email.subject}`);
                }
            }
        });
    } catch (error) {
        console.error('IMAP Sync Error:', error);
    }
};





