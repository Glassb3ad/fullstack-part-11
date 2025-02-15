import { describe, test, expect } from 'vitest';
import { createMessage } from '../message';

describe('message test', () => {
  test('count is added to message', () => {
    expect(createMessage(4, '11.2.2025')).toContain('4');
  });
  test('date is added to message', () => {
    expect(createMessage(4, '11.2.2025')).toContain('11.2.2025');
  });
});
