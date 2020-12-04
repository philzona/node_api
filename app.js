const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
