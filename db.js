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
    return rows[0]
}
async function create_Orders(

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
        text: `insert into Orders (date,school_id,vegetarian,celiac,standard,caloric,ethnic) values ($1, $2, $3,$4,$5,$6,$7)`,
        values: [
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
    return rows[0]
}

async function get_orders() {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: `select * from  Orders`,

    });
    client.release();
    return rows[0];
}

async function edit_orders() {

    return
}




module.exports = {
    get_user,
    create_user,
    create_Orders,
    edit_orders,
    get_orders,
};