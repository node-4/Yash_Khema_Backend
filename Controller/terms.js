const Terms = require('../Models/PrivacyTerm')



exports.create = async (req, res) => {
  try {
    if (!req.body.terms) {
      return res.status(400).send("please specify terms");
    }
    const result = await Terms.create({ terms: req.body.terms, type: "Term" });
    return res.status(200).send({ msg: "created", data: result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await Terms.findOneAndUpdate({ id: req.params.id }, { $set: { terms: req.body.terms, type: "Term" } }, {
      new: true,
    });
    // if (!data) {
    //   return res.status(400).send({ msg: "not found" });
    //   }
    return res.status(200).send({ msg: "updated", data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};


exports.get = async (req, res) => {
  try {
    const data = await Terms.find({type: "Term"});
    if (!data || data.length === 0) {
      return res.status(400).send({ msg: "not found" });
    }
    return res.status(200).send({ data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

exports.getId = async (req, res) => {
  try {
    const data = await Terms.findById(req.params.id);
    if (!data || data.length === 0) {
      return res.status(400).send({ msg: "not found" });
    }
    return res.status(200).send({ data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await Terms.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).send({ msg: "not found" });
    }
    return res.status(200).send({ msg: "deleted", data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error", error: err.message });
  }
};