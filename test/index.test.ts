import { hello } from '@/index';

describe('Hello world', () => {
  it('hello -> world', () => {
    expect(hello()).toBe('world');
  });
});
