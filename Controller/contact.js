const contact = require('../Models/contactDetail');
exports.addContactDetails = async (req, res) => {
  try {
    let findContact = await contact.findOne();
    if (findContact) {
      let obj = {
        phone: req.body.phone || findContact.phone,
        supportEmail: req.body.supportEmail || findContact.supportEmail,
        contactAddress: req.body.contactAddress || findContact.contactAddress,
        name: req.body.name || findContact.name,
      }
      let updateContact = await contact.findByIdAndUpdate({ _id: findContact._id }, { $set: obj }, { new: true });
      if (updateContact) {
        return res.status(200).json({ message: "Contact detail update successfully.", status: 200, data: updateContact });
      }
    } else {
      let result2 = await contact.create(req.body);
      if (result2) {
        return res.status(200).json({ message: "Contact detail add successfully.", status: 200, data: result2 });
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error", error: err.message, });
  }
};
exports.viewContactDetails = async (req, res) => {
  try {
    let findcontactDetails = await contact.findOne({});
    if (!findcontactDetails) {
      return res.status(404).json({ message: "Contact detail not found.", status: 404, data: {} });
    } else {
      return res.status(200).json({ message: "Contact detail found successfully.", status: 200, data: findcontactDetails });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error", error: err.message, });
  }
};
exports.deleteContactDetails = async (req, res) => {
  try {
    const data = await contact.findOne();
    if (!data) {
      return res.status(400).send({ msg: "not found" });
    }
    const data1 = await contact.findByIdAndDelete({ _id: data._id });

    return res.status(200).send({ msg: "deleted", data: data1 });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error", error: err.message });
  }
};