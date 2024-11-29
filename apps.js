require('dotenv').config();
const express = require('express');
const predictionRoutes = require('./routes/predictionRoutes');
const historyRoutes = require('./routes/historyRoutes');
const errorHandler = require('./middleware/errorHandler');
const initializeModel = require('./config/tfModel');

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: 'https://submissionmlgc-whilyanpratama.et.r.appspot.com',  
  methods: ['GET', 'POST'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(predictionRoutes);
app.use('/predict', historyRoutes);

app.use(errorHandler);

(async () => {
    try {
        const model = await initializeModel();
        app.locals.model = model;

        app.listen(port, '0.0.0.0', () => {
            console.log(`Server started at http://0.0.0.0:${port}`);
        });
    } catch (error) {
        console.error('Failed to initialize the server:', error.message);
        process.exit(1);
    }
})();