const express = require('express')
const fs = require('fs').promises
const {
    create_Orders,
    get_orders,
    edit_skater,
    get_user,
    //   aprove_skater,
} = require("../db.js");


const router = express.Router()

function protected_route(req, res, next) {
    if (!req.session.user) {
        // si quiere trabajar sin rutas prptegidas, comente la siguiente línea
        return res.redirect('/login')
    }
    next()
}

// RUTAS
router.get('/', async(req, res) => {
    let user = await get_orders()
        // skaters = skaters.filter(sk => sk.email != 'admin@gmail.com')
    res.render('index.html', { user })
})

router.get('/edit', protected_route, async(req, res) => {
    const user = await get_user(req.session.user.email)
    res.render('edit.html', { user })
})

router.get('/admin', protected_route, async(req, res) => {
    let skaters = await get_skaters()
        //  skaters = skaters.filter(sk => sk.email != 'admin@gmail.com')
    res.render('admin.html', { user: req.session.user.email })
})
router.get('/new', protected_route, async(req, res) => {
    let user = await get_orders();
    // console.log(user)
    // let school = school.filter(sk => sk.email != 'admin@gmail.com')
    res.render("new.html", { user });
});
router.post("/new", async(req, res) => {
    // 1. Recuperar los campos del formulario

    console.log(req.session.user.id);

    const date = req.body.date;
    const school_id = 1;
    const vegetarian = req.body.vegetarian;
    const celiac = req.body.celiac;
    const standard = req.body.standard;
    const caloric = req.body.caloric;
    const ethnic = req.body.ethnic;

    // 4. Finalmente podemos guardar el nuevo usuario en base de datos
    await create_Orders(

        date,
        school_id,
        vegetarian,
        celiac,
        standard,
        caloric,
        ethnic
    );

    // 5. y en la sesión
    // req.session.user = {
    //     id,
    // };
    console.log('session', req.session);

    res.redirect("/");
});





router.get('/aprove/:email/:estado', async(req, res) => {
    // const email = req.params.email
    // const estado = req.params.estado
    // await aprove_skater(email, estado)
    // res.send(`cambiando ${email} - ${estado}`)
})

module.exports = router