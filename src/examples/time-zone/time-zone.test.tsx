import { test, expect, vi, beforeEach } from 'vitest';
import { render } from 'test/utilities';
import TimeZone from '.';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 1, 22));
});

test('it should render successfully', () => {
  render(<TimeZone />);
});

test('should match the snapshot', async () => {
  const { container } = render(<TimeZone />);
  expect(container).toMatchSnapshot();
});

afterEach(() => {
  vi.useRealTimers();
});
