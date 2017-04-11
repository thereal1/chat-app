const moment = require('moment');

let date = moment();
console.log(date.format('MMMM Do, YYYY'));

date.add('year', 1).subtract(9, 'months');

console.log(date.format('h:mm a'));
