const {Pool} = require('pg'); 


const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT || 5432,
}); 

pool.connect((err,client,release) => {
    if(err){
        console.error('Error conectando',err.stack);
    } else {
        console.log('Conectado'); 
        release(); 
    }
}); 

module.exports = pool; 

