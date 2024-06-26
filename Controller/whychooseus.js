const privacy = require('../Models/PrivacyTerm');
exports.create = async (req, res) => {
  try {
    if (!req.body.whyChooseUs) {
      return res.status(400).send("please specify Why choose us");
    }
    const result = await privacy.create({ whyChooseUs: req.body.whyChooseUs, type: "Why choose us" });
    return res.status(200).send({ msg: "created", data: result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.update = async (req, res) => {
  try {
    const data = await privacy.findByIdAndUpdate({ _id: req.params.id }, { $set: { whyChooseUs: req.body.whyChooseUs, type: "Why choose us" } }, {
      new: true,
    });
    // if (!data) {
    //   return res.status(400).send({ msg: "not found" });
    // }
    return res.status(200).send({ msg: "updated" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.get = async (req, res) => {
  try {
    const data = await privacy.find({ type: "Why choose us" });
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
    const data = await privacy.findById(req.params.id);
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
    const data = await privacy.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(400).send({ msg: "not found" });
    }
    return res.status(200).send({ msg: "deleted", data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error", error: err.message });
  }
};