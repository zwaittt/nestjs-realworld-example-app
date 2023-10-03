// const { Client } = require('pg');

// main();
// async function main() {
//   const client = new Client({
//     user: 'admin',
//     port: 5432,
//     host: '127.0.0.1',
//     password: 'admin',
//     database: 'blog',
//   });
//   await client.connect();

//   const res = await client.query('SELECT $1::text as message', [
//     'Hello world!',
//   ]);
//   console.log(res.rows[0].message); // Hello world!
//   await client.end();
// }
