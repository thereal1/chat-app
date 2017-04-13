[{
  id: 'asd',
  name: 'zac',
  room: 'Juggling Society'
}]

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var usr = this.users.find(user => user.id === id);
    if (usr) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return usr;
  }
  getUser (id) {
    return this.users.find(user => user.id === id);
  }
  getUserList (room) {
    var users = this.users.filter(user => user.room === room);
    var namesArray = users.map(user => user.name);

    return namesArray;
  }
}


module.exports = {Users};
