const classifyImage = require('../utils/classifyImage'); // Pastikan ini benar
const { savePredictionData } = require('../database/firestore');
const ValidationError = require('../errors/ValidationError');

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
        if (error instanceof ValidationError) {
            next(error); 
        } else {
            next(new ValidationError('Terjadi kesalahan dalam melakukan prediksi'));
        }
    }
}
