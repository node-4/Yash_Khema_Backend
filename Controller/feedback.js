const feedback = require('../Models/feedback');


exports.AddFeedBack = async (req, res) => {
    try {
        const result = await feedback.create({ rating: parseFloat(req.body.rating), comment: req.body.comment });
        return res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        })
    }
}


exports.getAll = async (req, res) => {
    try {
        const result = await feedback.find();
        return res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.DeleteFeedBack = async (req, res) => {
    try {
        await feedback.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "FeedBack  Deleted "
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        })
    }
}