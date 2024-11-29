const crypto = require('crypto');
const classifyImage = require('../utils/classifyImage');
const { savePredictionData } = require('../database/firestore');

async function predict(req, res, next) {
    try {
        const { model } = req.app.locals;
        const image = req.file.buffer;

        const { classificationLabel, recommendation } = await classifyImage(model, image);
        const predictionId = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const predictionData = {
            id: predictionId,
            result: classificationLabel,
            suggestion: recommendation,
            createdAt,
        };

        await savePredictionData(predictionId, predictionData);

        res.status(201).json({
            status: 'success',
            message: 'Model is predicted successfully',
            data: predictionData,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { predict };