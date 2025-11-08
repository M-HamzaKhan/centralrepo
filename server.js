const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from BlueScarf Jenkins Pipeline');
});

app.listen(port, () => {
  console.log(`BlueScarf app listening on port ${port}`);
});
