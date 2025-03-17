const path = require('path');
const fs = require('fs-extra');

function populateFixtures(targetDir) {
  fs.copySync(path.resolve(__basedir, 'tests', 'fixtures'), targetDir);
}

module.exports = { populateFixtures };
