import express from 'express';
import calculateBMI from './01.01bmiCalculator';
import calculate, { isNumber } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const param = {
    weight: Number(req.query.weight),
    height: Number(req.query.height)
  };
  const { weight, height } = param;

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
    res.send({ error: 'malformatted parameters' });
  }
  const bmi = calculateBMI(weight, height);
  res.send({ weight, height, bmi });
});

app.post('/exercices', (req, res) => {
  const { dailyExercises, target } = req.body;

  if (!dailyExercises.every(isNumber)) {
    res.send({ error: 'malformated parameters' });
  } else if (!dailyExercises || !target) {
    res.send({ error: 'parameters missing' });
  }

  res.send(calculate(dailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
