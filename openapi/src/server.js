const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Load OpenAPI spec
const openapiDocument = YAML.load('./openapi.yaml');

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// In-memory to-do store
let todos = [];

// Routes
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: uuidv4(),
        title: req.body.title,
        completed: req.body.completed ?? false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);
    if (!todo) return res.status(404).send();
    res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).send();
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
});

app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).send();
    todos.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`To-do API running at http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/docs`);
});
