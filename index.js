const express = require('express');

const server = express();

const postsRouter = require('./blog-posts/posts-router.js');

server.use('/api/posts', postsRouter);

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'))