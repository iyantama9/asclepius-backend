const tf = require('@tensorflow/tfjs-node');
const ValidationError = require('../errors/ValidationError');

async function classifyImage(model, imageData) {
    try {
        const tensor = tf.node
            .decodeJpeg(imageData)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const scores = await prediction.data();
        const confidenceScore = Math.max(...scores) * 100;

        const classificationLabel = confidenceScore > 50 ? 'Cancer' : 'Non-cancer';
        const recommendation =
            classificationLabel === 'Cancer'
                ? 'Segera periksa ke dokter!'
                : 'Penyakit kanker tidak terdeteksi.';

        return { classificationLabel, recommendation };
    } catch (error) {
        throw new ValidationError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

module.exports = classifyImage;
