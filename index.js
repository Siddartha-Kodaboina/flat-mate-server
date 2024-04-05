const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./postgres-sequelize-db');
const customerRoutes = require('./api/v1/customers/customer.routes');
const communityRoutes = require('./api/v1/communities/community.routes');
const roomRoutes = require('./api/v1/rooms/room.routes');
const vacancyRoutes = require('./api/v1/vacancies/vacancy.routes');
const vacancyRequestRoutes = require('./api/v1/vacancy-requests/vacancyRequest.routes');

async function startServer() {
    const port = process.env.NODE_SERVER_PORT || 4000;

    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL database via Sequelize.');
    } catch (error) {
        console.error('Unable to connect to the PostgreSQL database via Sequelize:', error);
        process.exit(1);
    }


    // Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(bodyParser.json());

    // Testing Route
    app.get('/api/v1', async (req, res)=>{
        try {
            res.status(200).json({success: "You've reached the server"});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

    //Routes
    app.use('/api/v1/customers', customerRoutes);
    app.use('/api/v1/communities', communityRoutes);
    app.use('/api/v1/rooms', roomRoutes);
    app.use('/api/v1/vacancies', vacancyRoutes);
    app.use('/api/v1/vacancy-requests', vacancyRequestRoutes);

    sequelize.sync().then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}.`));
    });
}

startServer();
 