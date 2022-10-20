const { JSDOM } = require('jsdom');
const fs = require('fs');
const Handlebars = require('handlebars');

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

// eslint-disable-next-line func-names
require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = Handlebars.compile(contents);
};
require.extensions['.svg', '.png'] = function () {
    module.exports = () => '';
};

// eslint-disable-next-line func-names
require.extensions['.scss'] = function () {
  module.exports = () => ({});
};
