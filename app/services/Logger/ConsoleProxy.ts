import defaults = require('lodash/defaults');
import noop = require('lodash/noop');

export interface ILoggerOptions {
  silence: boolean;
}

export const defaultLoggerOptions: ILoggerOptions = {
  silence: false,
};

export default function generateConsoleProxy<T extends object>(
  io: T,
  customOptions?: Partial<ILoggerOptions>,
) {
  const options: ILoggerOptions = defaults(customOptions, defaultLoggerOptions);
  const handler: ProxyHandler<T> = {
    get(target, name) {
      if (!(name in target)) {
        return undefined;
      }

      if (options.silence) {
        return noop;
      }

      return Reflect.get(target, name);
    },
  };

  return new Proxy(io, handler);
}
