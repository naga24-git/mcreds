'use strict';
 
const express = require('express');
 
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
 
// App
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users/:userId', (req, res) => {
    res.send(require(`./users${req.params.userId}.json`));
});

app.post('/users', (req, res) => {
  const user = req.body;
  user.userId = 1;
  res.send(user);
});

app.post('/games', (req, res) => {
  const game = req.body;
  game.gameId = 1;
  res.send(game);
});

app.get('/games/:gameId', (req, res) => {
  res.send(require(`./games${req.params.gameId}.json`));
});

app.post('/games/:gameId/play-packages', (req, res) => {
  const pkg = req.body;
  pkg.packageId = 1;
  res.send(pkg);
});

app.post('/games/burst/:target', (req, res) => {
  res.send({
    status: req.params.target,
    message: req.params.target === 'ON' ? 'Increasing cluster capacity' : 'Decreasing cluster capacity'
  })
});

app.post('/games/:gameId/play-packages/:packageId/vote/:voteOption', (req, res) => {
  res.send({
    status: req.params.voteOption,
    message: `Vote Option ${req.params.voteOption} registered for package ${req.params.packageId} and game ${req.params.gameId}`
  })
});

app.get('/games/:gameId/my-votes/:userId', (req, res) => {
  res.send(require(`./votes${req.params.userId}.json`));
});

app.get('/games/:gameId/top-votes', (req, res) => {
  res.send(require(`./top-votes.json`));
});

 
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});