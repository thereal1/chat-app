const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message object', () => {
    const message = generateMessage('zac', 'hi');
    expect(message.from).toBe('zac');
    expect(message.text).toBe('hi');
    expect(message.createdAt).toBeA('number');
  });

});
