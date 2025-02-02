const express = require('express');

const server = express();

const postsRouter = require('./blog-posts/posts-router.js');

server.get('/', (req, res) => {
  res.send(`
    <h2> Welcome to Lambda's Blog </h2>
  `)
});

server.use('/api/posts', postsRouter);

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'))