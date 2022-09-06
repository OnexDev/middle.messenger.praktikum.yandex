const fallback = require('express-history-api-fallback');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './dist')));
app.use(fallback('index.html', { root: `${__dirname}/dist` }));

app.listen(PORT, () => {
  console.log(`Messenger app listening on port ${PORT}!`);
});
