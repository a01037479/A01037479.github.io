const Pool = require('pg').Pool;

const pool = new Pool({  
    //     host: 'localhost',  
    //     user: 'postgres',  
    //     database: 'artists',  
    //     password: 'cks1030107',
    //     port: 5432,
    //     ssl: false
        host: 'ec2-184-72-235-80.compute-1.amazonaws.com',  
        user: 'bzxrplkaqukbaq',  
        database: 'd3ev160m1bt1nu',  
        password: 'f19a4361b0c21b748924e482aab33852370fe9fa095cb35fb7d8a2c9d6c3c5a7',
        port: 5432,
        ssl: true
    });

module.exports = pool;