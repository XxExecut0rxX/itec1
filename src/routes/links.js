const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add_item', { title: 'Add new User', style: '/css/styles_dashboard.css'});
});

module.exports = router;