// import * as aiReplyService from "./aiReplyService";


// async function test() {
//   const emailText = "Hi, Your resume has been shortlisted. When will be a good time for you to attend the technical interview?";
//   //const reply = await generateReply(emailText);
//   aiReplyService.generateReply(emailText);

//   console.log("AI Suggested Reply:", reply);
// }

// test();


import { generateReply } from "./aiReplyService";

async function test() {
    const emailText = "Hi, Your resume has been shortlisted. When will be a good time for you to attend the technical interview?";
    
    const reply = await generateReply(emailText); // Store the response in a variable

    console.log("AI Reply:", reply); // Print the result
}

test();
