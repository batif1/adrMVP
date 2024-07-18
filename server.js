// server.js
const express = require('express');
const bodyParser = require('body-parser');
const verifyAccount = require('./VerifyAccount.js');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/verify-account', verifyAccount);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
