const Filter = require('bad-words');
const fs = require('fs');

const filter = new Filter();

// Read bad words from JSON file asynchronously
fs.readFile('./words.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const badWords = JSON.parse(data).badWords;
  filter.addWords(...badWords);

  console.log(filter.clean("This is a dumb message."));
});

module.exports = {
  filter: filter
};
