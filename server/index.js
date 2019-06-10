const express = require('express');
const app = express();
const port = 4000;
const routes = require('./router/router');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use((req,res,next) => {
  console.log(req.path);
  next()
})
app.use(routes);

app.listen(port, () => {
  console.log('Server is listening on port: ' + port + '...');
})
