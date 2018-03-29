const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); // Adding a piece of middleware

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];
app.get('/', (req, res) => {
  res.send('This is express JS');
});
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); // object destructure

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(400).send('This is invalid Id');
  }
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(400).send('This is invalid ID');
  }

  const { error } = validateCourse(req.body); // object destructure
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .alphanum()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(400).send('This is invalid ID');
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
