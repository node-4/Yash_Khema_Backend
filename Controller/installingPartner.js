const InstallingPartner = require('../Models/installerpartner');
exports.createPartner = async (req, res) => {
  try {
    const newPartner = new InstallingPartner(req.body);
    const savedPartner = await newPartner.save();
    return res.status(201).json(savedPartner);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await InstallingPartner.find();
    res.json(partners);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
exports.getAllPartnersByInstaller = async (req, res) => {
  try {
    const partners = await InstallingPartner.findOne({ instellers: req.params.instellers });
    res.json(partners);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
exports.getPartnerById = async (req, res) => {
  try {
    const partner = await InstallingPartner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
      return;
    }
    res.json(partner);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
exports.updatePartner = async (req, res) => {
  try {
    const updatedPartner = await InstallingPartner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );
    if (!updatedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
      return;
    }
    res.json(updatedPartner);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
exports.deletePartner = async (req, res) => {
  try {
    const deletedPartner = await InstallingPartner.findByIdAndDelete(req.params.id);
    if (!deletedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
      return;
    }
    res.json(deletedPartner);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


