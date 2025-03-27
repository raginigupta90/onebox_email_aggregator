"use strict";
// import axios from 'axios';
// import dotenv from 'dotenv';
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
exports.triggerWebhook = exports.sendSlackNotification = void 0;
// dotenv.config();
// export const sendSlackNotification = async (message: string) => {
//     await axios.post(process.env.SLACK_WEBHOOK_URL!, { text: message });
// };
// export const triggerWebhook = async (emailId: string) => {
//     await axios.post('https://webhook.site/your-webhook-url', { emailId });
// };
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("📢 Notification Service Started...");
const sendSlackNotification = (message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("📤 Sending Slack Notification:", message);
    yield axios_1.default.post(process.env.SLACK_WEBHOOK_URL, { text: message });
});
exports.sendSlackNotification = sendSlackNotification;
const triggerWebhook = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔗 Triggering Webhook for:", emailId);
    yield axios_1.default.post('https://webhook.site/your-webhook-url', { emailId });
});
exports.triggerWebhook = triggerWebhook;
