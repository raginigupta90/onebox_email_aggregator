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
Object.defineProperty(exports, "__esModule", { value: true });
const aiReplyService_1 = require("./aiReplyService");
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const emailText = "Hi, Your resume has been shortlisted. When will be a good time for you to attend the technical interview?";
        const reply = yield (0, aiReplyService_1.generateReply)(emailText);
        console.log("AI Suggested Reply:", reply);
    });
}
test();
