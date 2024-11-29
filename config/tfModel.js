const tf = require('@tensorflow/tfjs-node');

async function initializeModel() {
    return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = initializeModel;
