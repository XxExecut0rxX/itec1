const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', async (req, res) => {
    const item_ids = await pool.query('SELECT id FROM producto');
    const last_id = item_ids[item_ids.length - 1].id;
    const next_id = last_id + 1;
    console.log(last_id);
    res.render('links/add_item', { title: 'Add new User', style: '/css/styles_dashboard.css', next_id: next_id});
});

router.post('/add', async (req, res) => {
    // console.log(req.body);<

    const {id, name, price, stock} = req.body;
    const newItem = {
        id,
        name,
        price,
        stock
    };
    console.log(newItem);
    await pool.query('INSERT INTO producto set ?', [newItem]);
    // await console.log(pool.query('SELECT * FROM producto'));
    res.send('resc');
});

router.get('/', async (req, res) => {
    const catalog_list = await pool.query('SELECT * FROM producto');
    console.log(catalog_list);
    res.send('lists');
});

module.exports = router;