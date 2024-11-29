const { fetchAllPredictions } = require('../database/firestore');

async function getHistories(req, res, next) {
    try {
        const allPredictions = await fetchAllPredictions();
        const formattedPredictions = [];

        allPredictions.forEach((doc) => {
            const data = doc.data();
            formattedPredictions.push({
                id: doc.id,
                history: {
                    result: data.result,
                    createdAt: data.createdAt,
                    suggestion: data.suggestion,
                    id: doc.id,
                },
            });
        });

        res.status(200).json({
            status: 'success',
            data: formattedPredictions,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getHistories };
