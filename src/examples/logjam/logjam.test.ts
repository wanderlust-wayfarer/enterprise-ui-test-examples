import { describe, it, test, expect, vi } from 'vitest';
import { log } from './log';

describe('log', () => {
  let originalConsoleLog: typeof console.log;
  let originalConsoleError: typeof console.error;
  let originalConsoleWarn: typeof console.warn;
  let originalConsoleInfo: typeof console.info;

  beforeEach(() => {
    // Save the original console methods
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    originalConsoleWarn = console.warn;
    originalConsoleInfo = console.info;

    // Mock the console methods
    console.log = vi.fn();
    console.error = vi.fn();
    console.warn = vi.fn();
    console.info = vi.fn();
  });

  afterEach(() => {
    // Restore the original console methods after each test
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.info = originalConsoleInfo;
  });

  it('should call console.log with the correct arguments for "log" channel', () => {
    log('log', 'Hello', 'World');
    expect(console.log).toHaveBeenCalledWith('Hello', 'World');
  });

  it('should call console.error with the correct arguments for "error" channel', () => {
    log('error', 'Something went wrong');
    expect(console.error).toHaveBeenCalledWith('Something went wrong');
  });

  it('should call console.warn with the correct arguments for "warn" channel', () => {
    log('warn', 'Warning: This is a warning');
    expect(console.warn).toHaveBeenCalledWith('Warning: This is a warning');
  });

  it('should call console.info with the correct arguments for "info" channel', () => {
    log('info', 'Information: This is information');
    expect(console.info).toHaveBeenCalledWith(
      'Information: This is information',
    );
  });
});

test('underlying api is called when log is mocked', () => {
  vi.spyOn(console, 'log').mockImplementation(() => {});

  log('log', 1, 2, 3);

  expect(console.log).toHaveBeenCalledWith(1, 2, 3);
});
