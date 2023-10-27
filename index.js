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
    console.log(`Received GET request for /users/:userId`);
    res.send(require(`./users${req.params.userId}.json`));
});

app.post('/users', (req, res) => {
  console.log(`Received POST request for /users`);
  const user = req.body;
  user.userId = 1;
  res.send(user);
});

app.post('/games', (req, res) => {
  console.log(`Received POST request for /games`);
  const game = req.body;
  game.gameId = 1;
  res.send(game);
});

app.get('/games/:gameId', (req, res) => {
  console.log(`Received GET request for /games/:gameId`);
  res.send(require(`./games${req.params.gameId}.json`));
});

app.post('/games/:gameId/play-packages', (req, res) => {
  console.log(`Received POST request for /games/:gameId/play-packages`);
  const pkg = req.body;
  pkg.packageId = 1;
  res.send(pkg);
});

app.post('/voting/burst/:target', (req, res) => {
  console.log(`Received POST request for /voting/burst/:target`);
  res.send({
    status: req.params.target,
    message: req.params.target === 'ON' ? 'Increasing cluster capacity' : 'Decreasing cluster capacity'
  })
});

app.post('/voting/games/:gameId/play-packages/:packageId/vote/:voteOption', (req, res) => {
  console.log(`Received POST request for /voting/games/:gameId/play-packages/:packageId/vote/:voteOption`);
  res.send({
    status: req.params.voteOption,
    message: `Vote Option ${req.params.voteOption} registered for package ${req.params.packageId} and game ${req.params.gameId}`
  })
});

app.post('/voting/capture-votes', (req, res) => {
  console.log(`Received POST request for /voting/capture-votes`);
  console.log(req.body);
  res.send({
    status: 'Status captured'
  })
});

app.get('/voting/games/:gameId/my-votes/:userId', (req, res) => {
  console.log(`Received POST request for /voting/games/:gameId/my-votes/:userId`);
  res.send(require(`./votes${req.params.userId}.json`));
});

app.get('/voting/games/:gameId/top-votes', (req, res) => {
  console.log(`Received POST request for /voting/games/:gameId/top-votes`);
  res.send(require(`./top-votes.json`));
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});