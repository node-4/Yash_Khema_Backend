const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const wallet = require("../Models/Wallet");
const transactionModel = require("../Models/transactionModel");
const installer = require("../Models/User");
const instellerSkill = require("../Models/instellerSkill");
const skill = require("../Models/skill");
const subSkill = require("../Models/subSkill");
const { AddOnResultInstance, AddOnResultPage, } = require("twilio/lib/rest/api/v2010/account/recording/addOnResult");
const { generateOTP, verifyOTP } = require('../Helpers/Otp.js');

exports.sendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const Installer = await installer.findOne({ mobile: mobileNumber, userType: "insteller" });
    if (Installer) {
      return res.status(201).json({ message: "Mobile Number is already register.", });
    }
    const otpSecret = await generateOTP(4);
    console.log(otpSecret);
    const data = { mobile: mobileNumber, otpSecret: otpSecret, userType: "insteller" };
    const result = await installer.create(data);
    await wallet.create({ user: result._id });
    return res.status(200).json({ message: "OTP sent successfully", otp: result.otpSecret });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await installer.findOne({ email, userType: "insteller" });

    if (!user) {
      return res.status(400).json({ message: "Installer Email not register " });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password Not Match",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY);

    return res.status(201).json({ token: token, InstallerId: user._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.verifyOTP = async (req, res) => {
  try {
    const { otpSecret } = req.body;
    const user = await installer.findOne({ otpSecret });

    if (!user) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    //   const isValid = speakeasy.totp.verify({
    //     secret: otpSecret,
    //     encoding: 'base32',
    //     token: otp,
    //     window: 6
    //   });

    //   if (!isValid) {
    //     user.otpAttempts += 1;

    //     if (user.otpAttempts >= 3) {
    //       await User.deleteOne({ _id: user._id });
    //       return res.status(401).json({ message: 'Account locked' });
    //     }

    //     await user.save();

    //     return res.status(401).json({ message: 'Invalid OTP' });
    //   }

    const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY);

    res
      .status(200)
      .json({ message: "Otp Verify ", token: token, userId: user._id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.UpdateProfile = async (req, res) => {
  try {
    const result = await installer.findById({ _id: req.params.id });
    result.name = req.body.name;
    result.email = req.body.email;
    result.password = await bcrypt.hashSync(req.body.password, 10);
    result.start = {
      Shours: req.body.starthours,
      Smin: req.body.startmin,
      SSec: req.body.SSec,
    };
    result.endtime = {
      Ehours: req.body.endhours,
      Emin: req.body.endMin,
      Esec: req.body.Esec,
    };
    result.orderAcceptance = req.body.orderAcceptance;
    result.save();
    return res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.DeleteInsteller = async (req, res) => {
  try {
    await installer.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: "Insteller is Deleted ",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
};
exports.Address = async (req, res) => {
  try {
    const result = await installer.findById({ _id: req.params.id });
    result.location = {
      address: req.body.address,
      long: req.body.long,
      late: req.body.late,
      Radius: req.body.Radius,
    };
    result.save();
    return res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
};
exports.AddServices = async (req, res) => {
  try {
    const result = await installer.findById({ _id: req.params.id });
    result.servies = req.body.servies;
    result.save();
    return res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
};
exports.getAllInstaller = async (req, res) => {
  try {
    const result = await installer.find();
    return res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
};
exports.getByInstallerId = async (req, res) => {
  try {
    const result = await installer.findById({ _id: req.params.id });
    return res.status(200).json({
      message: "ok",
      result: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err.message,
    });
  }
};
exports.addskillForuser = async (req, res) => {
  try {
    let findSkill = await skill.findById({ _id: req.body.skillId });
    if (findSkill) {
      let findSkill1 = await instellerSkill.findOne({ skillId: req.body.skillId, installerId: req.body.installerId });
      if (findSkill1) {
        return res.status(409).send({ status: 409, msg: "Skill Already add." });
      } else {
        let obj = {
          installerId: req.body.installerId,
          skillId: findSkill._id,
        }
        let SaveinstellerSkill = await instellerSkill.create(obj);
        if (SaveinstellerSkill) {
          return res.status(200).send({ status: 200, msg: "Skill add successfully.", data: SaveinstellerSkill });
        }
      }

    } else {
      return res.status(404).send({ status: 404, msg: "Skill not found" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message, });
  }
};
exports.addSubskillForuser = async (req, res) => {
  try {
    let findSkill1 = await instellerSkill.findById({ _id: req.params.id })
    if (findSkill1) {
      let findsubSkill = await subSkill.findOne({ _id: req.body.subSkillId });
      if (findsubSkill) {
        if (!findSkill1.subSkill.includes(req.body.subSkillId)) {
          let SaveinstellerSkill = await instellerSkill.findByIdAndUpdate({ _id: findSkill1._id, }, { $push: { subSkill: req.body.subSkillId } }, { new: true });
          if (SaveinstellerSkill) {
            return res.status(200).send({ status: 200, msg: "Sub Skill add successfully." });
          }
        } else {
          return res.status(200).send({ status: 200, msg: "Sub Skill add successfully." });
        }
      } else {
        return res.status(404).send({ status: 404, msg: "Sub Skill not found" });

      }
    } else {
      return res.status(404).send({ status: 404, msg: "Insteller Skill not found" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message, });
  }
};
exports.removeSubskillForuser = async (req, res) => {
  try {
    let findSkill1 = await instellerSkill.findById({ _id: req.params.id })
    if (findSkill1) {
      let findsubSkill = await subSkill.findOne({ _id: req.body.subSkillId });
      if (findsubSkill) {
        if (findSkill1.subSkill.includes(req.body.subSkillId)) {
          let SaveinstellerSkill = await instellerSkill.findByIdAndUpdate({ _id: findSkill1._id, }, { $pull: { subSkill: req.body.subSkillId } }, { new: true });
          if (SaveinstellerSkill) {
            return res.status(200).send({ status: 200, msg: "Sub Skill add successfully." });
          }
        } else {
          return res.status(200).send({ status: 200, msg: "Sub Skill add successfully." });
        }
      } else {
        return res.status(404).send({ status: 404, msg: "Sub Skill not found" });

      }
    } else {
      return res.status(404).send({ status: 404, msg: "Insteller Skill not found" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message, });
  }
};
exports.getskillForuser = async (req, res) => {
  try {
    let findSkill1 = await instellerSkill.find({ installerId: req.params.installerId }).populate('skillId').select('skillId');
    if (!findSkill1) {
      return res.status(404).send({ status: 404, msg: "User Skill not found successfully.", data: [] });
    } else {
      return res.status(200).send({ status: 200, msg: "User Skill found successfully.", data: findSkill1 });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message, });
  }
};
exports.getsubSkillForuser = async (req, res) => {
  try {
    let findSkill1 = await instellerSkill.findById({ _id: req.params.id }).populate('skillId subSkill').select('skillId subSkill');
    if (!findSkill1) {
      return res.status(404).send({ status: 404, msg: "User Skill not found successfully.", data: [] });
    } else {
      return res.status(200).send({ status: 200, msg: "User Skill found successfully.", data: findSkill1 });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message, });
  }
};
exports.getWallet = async (req, res) => {
  try {
    let findSkill1 = await wallet.findOne({ user: req.params.installerId, });
    if (!findSkill1) {
      return res.status(404).send({ status: 404, msg: "Wallet not found successfully.", data: 0 });
    } else {
      return res.status(200).send({ status: 200, msg: "Wallet get successfully.", data: findSkill1 });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message, });
  }
};
exports.allTransactionUser = async (req, res) => {
  try {
    const data = await transactionModel.find({ installer: req.params.installerId }).populate("orderId");
    if (data.length > 0) {
      return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
    } else {
      return res.status(404).json({ status: 404, message: "Data not found.", data: {} });
    }

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
exports.removeMoney = async (req, res) => {
  try {
    let findSkill1 = await wallet.findOne({ user: req.params.installerId, });
    if (!findSkill1) {
      return res.status(404).send({ status: 404, msg: "Wallet not found successfully.", data: 0 });
    } else {
      if (findSkill1.balance >= parseInt(req.body.balance)) {
        let update = await wallet.findByIdAndUpdate({ _id: findSkill1._id }, { $set: { balance: findSkill1.balance - parseInt(req.body.balance) } }, { new: true });
        if (update) {
          const date = new Date();
          let month = date.getMonth() + 1;
          let obj = {
            installer: req.params.installerId,
            date: date,
            month: month,
            amount: req.body.balance,
            type: "Debit",
          };
          const data1 = await transactionModel.create(obj);
          if (data1) {
            return res.status(200).json({ status: 200, message: "Money has been deducted.", data: data1, });
          }
        }
      } else {
        return res.status(404).send({ status: 404, msg: "Low balance.", data: 0 });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(501).send({ status: 501, message: "server error.", data: {}, });
  }
};
exports.addCommission = async (req, res) => {
  try {
    let findSkill1 = await wallet.findOne({ user: req.params.installerId });
    if (!findSkill1) {
      return res.status(404).send({ status: 404, msg: "Wallet not found successfully.", data: 0 });
    } else {
      let update = await wallet.findByIdAndUpdate({ _id: findSkill1._id }, { $set: { balance: findSkill1.balance + parseInt(req.body.balance) } }, { new: true });
      const date = new Date();
      let month = date.getMonth() + 1;
      let obj = {
        installer: req.params.installerId,
        orderId: req.body.orderId,
        date: date,
        month: month,
        amount: req.body.balance,
        type: "Credit",
      };
      const data1 = await transactionModel.create(obj);
      if (data1) {
        return res.status(200).json({ status: 200, message: "Money has been deducted.", data: data1, });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(501).send({ status: 501, message: "server error.", data: {}, });
  }
};