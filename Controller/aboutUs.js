const AboutUs = require('../Models/aboutUs');

exports.createAboutUs = async (req, res) => {
  try {
    const newAboutUs = {
      title: req.body.title, desc: req.body.desc
    }
    console.log(newAboutUs)
    const result = await AboutUs.create(newAboutUs)
    return res.status(200).json({
      message: result
    })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: err.message
    })
  }
};

// READ operation
exports.getAboutUs = async (req, res) => {
  try {
    const result = await AboutUs.find();
    return res.status(200).json({ "message": "About  us data found successfully.", "status": 200, "success": true, "data": result, })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: err.message
    })
  }
};

// UPDATE operation
exports.updateAboutUs = async (req, res) => {
  try {
    const result = await AboutUs.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.title, desc: req.body.desc });
    return res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: err.message
    })
  }
};

// DELETE operation
exports.deleteAboutUs = async (req, res) => {
  try {
    const result = await AboutUs.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: "ok"
    })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: err.message
    })
  }
};