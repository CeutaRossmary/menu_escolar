const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: '5432',
    database: 'menu_escolar',
    max: 20,
    min: 2,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000
})

async function get_user(email) {
    const client = await pool.connect()
    const { rows } = await client.query({
        text: `select * from  Schools where email=$1`,
        values: [email],
    });
    client.release()
    return rows[0]
}


async function create_user(name, email, password) {
    const client = await pool.connect()
    const { rows } = await client.query({
        text: `insert into Schools (name, email, password) values ($1, $2, $3)`,
        values: [name, email, password],
    });
    client.release()
        //return rows[0]
}
async function create_Orders(
    id,
    date,
    school_id,
    vegetarian,
    celiac,
    standard,
    caloric,
    ethnic
) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: `insert into Orders (id,date,school_id,vegetarian,celiac,standard,caloric,ethnic) values ($1, $2, $3,$4,$5,$6,$7)`,
        values: [
            id,
            date,
            school_id,
            vegetarian,
            celiac,
            standard,
            caloric,
            ethnic,
        ],
    });
    client.release();
    //return rows[0]
}

async function get_Schools() {
    const client = await pool.connect()
    const { rows } = await client.query('select * from Schools')
    client.release()
    return rows
}

async function edit_skater(nombre, email, password, especialidad, agnos_experiencia) {
    // const client = await pool.connect()
    // await client.query({
    //     text: `update skaters set nombre=$1, password=$3, especialidad=$4, agnos_experiencia=$5 where email=$2`,
    //     values: [nombre, email, password, especialidad, agnos_experiencia]
    // })
    // client.release()
    return
}

// async function aprove_skater(email, estado) {
//     // const client = await pool.connect()
//     // const estado_boolean = estado == 'true' ? true : false
//     // await client.query({
//     //     text: `update skaters set estado=$1 where email=$2`,
//     //     values: [estado_boolean, email]
// })
// client.release()
// return
// }


module.exports = {
    get_user,
    create_user,
    get_Schools,
    edit_skater,
    //   aprove_skater,
};