const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', async (req, res) => {
    const item_ids = await pool.query('SELECT id FROM producto');
    var last_id
    if(item_ids.length > 0)
        last_id = item_ids[item_ids.length - 1].id;
    else 
        last_id = 0;
    const next_id = last_id + 1;
    // console.log(last_id);
    res.render('links/add_item', { title: 'Añadir Nuevo Producto', style: '/css/styles_dashboard.css', next_id: next_id,});
});

router.post('/add', async (req, res) => {
    // console.log(req.body);

    const {id, name, price, stock} = req.body;
    const newItem = {
        id,
        name,
        price,
        stock
    };
    // console.log(newItem);
    await pool.query('INSERT INTO producto set ?', [newItem]);
    // await console.log(pool.query('SELECT * FROM producto'));
    req.flash('success', 'Nuevo Producto se Añadio Correctamente');
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const catalog_list = await pool.query('SELECT * FROM producto');
    // console.log(catalog_list);
    res.render('links/item_list', {title: 'Lista de Productos', style: '/css/styles_market.css', list: catalog_list});
});

router.get('/delete/:id', async (req, res) => {
    // console.log(req.params.id);
    const { id } = req.params;
    await pool.query('DELETE FROM producto WHERE id = ?', [id]);
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    item = await pool.query('SELECT * FROM producto WHERE id = ?', [id]);
    // console.log(item[0]);
    res.render('links/edit_item', { title: 'Editar Producto', style: '/css/styles_dashboard.css', item: item[0]});
});

router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {name, price, stock, img_dir} = req.body;
    const editItem = {
        name,
        price,
        stock,
    };
    await pool.query('UPDATE producto set ? WHERE id = ?' , [editItem, id])
    res.redirect('/links');
});

module.exports = router;