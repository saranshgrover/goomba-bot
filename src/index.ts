import { Client, Message } from 'discord.js';
import { default as config } from './config.json';

const client = new Client();

client.once('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message: Message): null => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(config.token);
