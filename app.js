const express = require('express');
const client = require('prom-client');

const app = express();
client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'task_manager_http_requests_total',
  help: 'Total HTTP requests received'
});

app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

app.get('/', (req, res) => {
  res.send(`
    <h2>Student Task Manager</h2>
    <button onclick="fetch('/task').then(() => console.log('Traffic sent'))">
      Add Dummy Task (Generate Traffic)
    </button>
  `);
});

app.get('/task', (req, res) => res.json({ status: 'Task Added' }));

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, '0.0.0.0', () => console.log('Running on port 3000'));