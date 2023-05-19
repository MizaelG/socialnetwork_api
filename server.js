const express = require('express');
const db = require('./config/connection');
const api_routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api_routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log('Server running on port ${PORT}!');
    })
});