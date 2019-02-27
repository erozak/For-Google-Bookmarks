const path = require('path');

const fromRoot = (...pathes) => path.resolve(__dirname, '../..', ...pathes);
const fromBuild = (...pathes) => fromRoot('build', ...pathes);
const fromApp = (...pathes) => fromRoot('app', ...pathes);

module.exports = {
  fromRoot,
  fromBuild,
  fromApp,
};
