var expect=require('expect');
var {generateMessage}=require('./message');
describe('generateMessage',()=>{
  it('should generate correct message',()=>{
    var from='JAY';
    var text='Some message';
    var message=generateMessage(from,text);

    expect(message.createdAt)==('number');
    expect(message).toMatchObject({from,text});
  });
});
