const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to set the correct Content-Type header
app.use((req, res, next) => {
  if (req.url === '/apple-app-site-association') {
    res.setHeader('Content-Type', 'application/json');
  }
  next();
});

// Route to serve the apple-app-site-association file
app.get('/apple-app-site-association', (req, res) => {
  const filePath = path.join(__dirname, 'apple-app-site-association');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});