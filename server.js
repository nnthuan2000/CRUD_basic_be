const dotenv = require('dotenv');
const db = require('./src/models');

dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') {
    db.sequelize
        .sync()
        .then(() => {
            console.log(`Synced db.`);
        })
        .catch((err) => {
            console.log('Failed to sync db: ', err.message);
        });
} else {
    db.sequelize.sync({ force: true }).then(() => console.log(`Drop and re-sync db`));
}

const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
