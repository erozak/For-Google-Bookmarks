import { isFunction, get } from 'lodash';

import ConsoleProxy from './ConsoleProxy';

describe('services/logger', () => {
  it('should create a console-like logger with custom features.', () => {
    const logger = ConsoleProxy<Console>(console);

    expect(isFunction(get(logger, 'log'))).toBeTruthy();
    expect(isFunction(get(logger, 'nothing'))).toBeFalsy();
  });

  it('should do nothing when is silence.', () => {
    const mock = {
      log: jest.fn(),
    };
    const logger = ConsoleProxy<typeof mock>(mock, {
      silence: true,
    });

    logger.log('Do nothing.');

    expect(mock.log).toBeCalledTimes(0);
  });
});
