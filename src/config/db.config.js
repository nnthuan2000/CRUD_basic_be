module.exports = {
    // HOST: 'localhost',
    // USER: 'root',
    // PASSWORD: 'qweqweqwe',
    // DB: 'testdb',
    // dialect: 'mysql',
    path: 'mysql://root:qweqweqwe@localhost:3306/testdb',
    // pool: will be used for Sequelize connection pool configuration
    pool: {
        max: 5, // maximum number of connection in pool
        min: 0, // minimum number of connection in pool
        acquire: 30000, // maximum time (ms) that pool will try to get connection before throwing error
        idle: 10000, // maximum time (ms), that a connection can be idle before being released
    },
};
