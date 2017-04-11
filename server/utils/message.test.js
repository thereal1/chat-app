const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message object', () => {
    const message = generateMessage('zac', 'hi');
    expect(message.from).toBe('zac');
    expect(message.text).toBe('hi');
    expect(message.createdAt).toBeA('number');
  });

});


describe('generate location message', () => {

  it('should generate correct location object', () => {
    const message = generateLocationMessage('zac', 12, 5);
    expect(message.from).toBe('zac');
    expect(message.url).toBe('https://www.google.com/maps?q=12,5');
    expect(message.createdAt).toBeA('number');
  });

});
