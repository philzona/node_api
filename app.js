const express = require('express');
const app = express();

const fs = require('fs');

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-modified.json`)
);

// GET /tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

// POST /tours
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-modified.json`,
    JSON.stringify(tours),
    err => {
      if (err) {
        res.status(500).json({
          status: 'error',
          data: {
            error: err
          }
        });
      }

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
