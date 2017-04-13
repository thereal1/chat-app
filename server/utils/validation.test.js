const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {

  it('should reject non-string values', () => {
    const num = isRealString(2);
    expect(num).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    const input = isRealString('  ');
    expect(input).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    const input = isRealString('  swagbitch  ');
    expect(input).toBe(true);
  });

});
