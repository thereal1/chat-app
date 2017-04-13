const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Lads'
    }, {
      id: '2',
      name: 'Jen',
      room: 'Node Lads'
    }, {
      id: '3',
      name: 'Mike',
      room: 'React Boiz'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 'asdew213',
      name: 'zac',
      room: 'Golf Club'
    }
    var responseUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names of a particular group', () => {
    var usersList = users.getUserList('Node Lads');
    expect(usersList).toEqual(['Mike', 'Jen']);
  });

  it('should get a particular user', () => {
    var user = users.getUser('1');
    expect(user.name).toBe('Mike');
  });

  it('should not get a user', () => {
    var user = users.getUser('444');
    expect(user).toEqual(undefined);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '442';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

});
