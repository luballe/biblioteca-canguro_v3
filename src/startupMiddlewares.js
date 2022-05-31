const express = require('express');
const app = require('./app');
var cors = require('cors');

app.use(express.json());
app.use(express.static(__dirname + '/../public'));
app.use(
  cors({
    origin: '*',
    exposedHeaders: [
      'X-Pagination-HasPrev',
      'X-Pagination-HasNext',
      'X-Pagination-CurrentPage',
      'X-Pagination-TotalPages',
      'X-Pagination-TotalItems',
      'X-Pagination-MinItem',
      'X-Pagination-MaxItem',
      'X-Pagination-Limit',
    ],
  })
);
