exports.log = function(filename, msg) {
  let path = require('path');
  let fn = path.basename(filename, `.js`);
  console.log(`${fn} was used by ${msg.author.tag}.`);
}
