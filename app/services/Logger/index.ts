import ConsoleProxy from './ConsoleProxy';

const logger = ConsoleProxy(console, {
  silence: process.env.NODE_ENV === 'production',
});

export default logger;
