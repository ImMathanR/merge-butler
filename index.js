const axios = require('axios');
const dotenv = require('dotenv')
const { App } = require('@slack/bolt');
const { ConsoleLogger } = require('@slack/logger');

dotenv.config()

const app = new App({
  signingSecret: process.env.SIGNING_SECRET,
  token: process.env.BOT_TOKEN,
  appToken: process.env.APP_TOKEN,
  socketMode: true
});

// Listens to incoming messages that contain "merged"
app.message('Merged :merged_parrot:', async ( resp ) => {
    console.log(resp);
    sendResponse(resp);
});

app.message('merged :merged_parrot:', async ( resp ) => {
    sendResponse(resp);
});

async function sendResponse({ client, message}) {
    try {
        // Call the chat.postMessage method using the WebClient
        const result = await client.chat.postMessage({
            channel: message.channel,
            user: message.user,
            thread_ts: message.ts,
            text: "Well done :getshitdone Now have you moved your ticket? :eyebrows:"
        });
      
        console.log(result);
      } catch(error) {
        console.log('failed', error)
      }
}


(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

