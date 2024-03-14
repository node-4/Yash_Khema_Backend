const city = require('../Models/Membership/city');
const plans = require('../Models/Membership/plans');
const society = require('../Models/Membership/society');
const userMembership = require('../Models/Membership/userMembership');
const User = require('../Models/User');
exports.AddCity = async (req, res) => {
        try {
                let result = await city.findOne({ name: req.body.name })
                if (result) {
                        return { success: false, status: 409, error: 'City already exit!!!' }
                } else {
                        const data = { name: req.body.name, }
                        const result1 = await city.create(data);
                        if (result1) {
                                return res.status(200).json({ success: true, data: result1, status: 200, message: "Successfully Found Data !!" })
                        }
                }
        } catch (err) {
                return res.status(400).json({ message: err.message })
        }
}
exports.getAllCity = async (req, res) => {
        try {
                const result = await city.find({})
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({
                        message: err.message
                })
        }
}
exports.DeleteCity = async (req, res) => {
        try {
                let result = await city.findByIdAndDelete({ _id: req.params.id });
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Delete Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}
exports.getByIdCity = async (req, res) => {
        try {
                const result = await city.findById({ _id: req.params.id })
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "City Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'City Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}
exports.AddSociety = async (req, res) => {
        try {
                const findCity = await city.findById({ _id: req.body.cityId })
                if (findCity) {
                        let result = await society.findOne({ name: req.body.name, cityId: findCity._id })
                        if (result) {
                                return { success: false, status: 409, error: 'Society already exit!!!' }
                        } else {
                                const data = { name: req.body.name, cityId: findCity._id }
                                const result1 = await society.create(data);
                                if (result1) {
                                        return res.status(200).json({ success: true, data: result1, status: 200, message: "Successfully Found Data !!" })
                                }
                        }
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'City Not Found!!!' })
                }
        } catch (err) {
                return res.status(400).json({ message: err.message })
        }
}
exports.getAllSociety = async (req, res) => {
        try {
                if (req.query.cityId) {
                        const result = await society.find({ cityId: req.query.cityId })
                        if (result) {
                                return res.status(200).json({ success: true, data: result, status: 200, message: "Successfully Found Data !!" })
                        } else {
                                return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                        }
                } else {
                        const result = await society.find({})
                        if (result) {
                                return res.status(200).json({ success: true, data: result, status: 200, message: "Successfully Found Data !!" })
                        } else {
                                return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                        }
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}
exports.DeleteSociety = async (req, res) => {
        try {
                let result = await society.findByIdAndDelete({ _id: req.params.id });
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Delete Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}
exports.getByIdSociety = async (req, res) => {
        try {
                const result = await society.findById({ _id: req.params.Id })
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Society Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Society Not Found!!!' })
                }
        } catch (err) {
                console.error(error);
                return res.status(400).json({ message: err.message })
        }
}
exports.AddPlans = async (req, res) => {
        try {
                let result = await plans.findOne({ name: req.body.name })
                if (result) {
                        const data = { name: req.body.name, price: req.body.price, services: req.body.services, }
                        const result1 = await plans.findByIdAndUpdate({ _id: result._id }, { $set: data }, { new: true });
                        if (result1) {
                                return res.status(200).json({ success: true, data: result1, status: 200, message: "Successfully Found Data !!" })
                        }
                } else {
                        const data = { name: req.body.name, price: req.body.price, services: req.body.services, }
                        const result1 = await plans.create(data);
                        if (result1) {
                                return res.status(200).json({ success: true, data: result1, status: 200, message: "Successfully Found Data !!" })
                        }
                }
        } catch (err) {
                return res.status(400).json({ message: err.message })
        }
}
exports.getAllPlans = async (req, res) => {
        try {
                const result = await plans.find({})
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({
                        message: err.message
                })
        }
}
exports.DeletePlans = async (req, res) => {
        try {
                let result = await plans.findByIdAndDelete({ _id: req.params.id });
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Delete Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}
exports.getByIdPlans = async (req, res) => {
        try {
                const result = await plans.findById({ _id: req.params.id })
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Plans Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Plans Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}
exports.takeUserMembership = async (req, res) => {
        try {
                const user = await User.findOne({ _id: req.user._id, });
                if (!user) {
                        return res.status(404).send({ status: 404, message: "User not found" });
                } else {
                        let id = req.params.id;
                        const findSubscription = await plans.findById(id);
                        if (findSubscription) {
                                const findTransaction = await userMembership.findOne({ user: user._id, servicePlan: findSubscription._id, status: "pending" });
                                if (findTransaction) {
                                        let deleteData = await userMembership.findByIdAndDelete({ _id: findTransaction._id })
                                        let obj = {
                                                user: user._id,
                                                servicePlan: findSubscription._id,
                                                status: "pending",
                                        }
                                        let update = await userMembership.create(obj);
                                        if (update) {
                                                return res.status(200).send({ status: 200, message: "update successfully.", data: update });
                                        }
                                } else {
                                        let obj = {
                                                user: user._id,
                                                servicePlan: findSubscription._id,
                                                status: "pending",
                                        }
                                        let update = await userMembership.create(obj);
                                        if (update) {
                                                return res.status(200).send({ status: 200, message: "update successfully.", data: update });
                                        }
                                }
                        } else {
                                return res.status(404).send({ status: 404, message: "Subscription not found" });
                        }
                }
        } catch (error) {
                console.error(error);
                return res.status(500).send({ status: 500, message: "Server error" + error.message });
        }
};
exports.verifyUserMembership = async (req, res) => {
        try {
                let findTransaction = await userMembership.findById({ _id: req.params.id, type: "Subscription", Status: "pending" });
                if (findTransaction) {
                        if (req.body.Status == "Paid") {
                                let subscriptionExpiration = new Date(Date.now());
                                subscriptionExpiration.setMonth(subscriptionExpiration.getMonth() + 1);
                                let update = await userMembership.findByIdAndUpdate({ _id: findTransaction._id }, { $set: { Status: "Paid", subscriptionExpiration: subscriptionExpiration, isSubscription: true } }, { new: true });
                                if (update) {
                                        return res.status(200).send({ status: 200, message: 'subscription subscribe successfully.', data: update });
                                }
                        }
                        if (req.body.Status == "failed") {
                                let update = await userMembership.findByIdAndUpdate({ _id: findTransaction._id }, { $set: { Status: "failed" } }, { new: true });
                                if (update) {
                                        return res.status(200).send({ status: 200, message: 'subscription not subscribe successfully.', data: update });
                                }
                        }
                } else {
                        return res.status(404).send({ status: 404, message: "Transaction not found" });
                }
        } catch (error) {
                console.error(error);
                return res.status(500).send({ status: 500, message: "Server error" + error.message });
        }
};
exports.getAllUserMembership = async (req, res) => {
        try {
                const user = await User.findOne({ _id: req.user._id, });
                if (!user) {
                        return res.status(404).send({ status: 404, message: "User not found" });
                } else {
                        const result = await userMembership.find({ user: user._id }).populate('servicePlan')
                        if (result) {
                                return res.status(200).json({ success: true, data: result, status: 200, message: "Successfully Found Data !!" })
                        } else {
                                return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                        }
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}
exports.getByIdUserMembership = async (req, res) => {
        try {
                const result = await userMembership.findById({ _id: req.params.id }).populate('servicePlan')
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Plans Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Plans Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}
exports.getAllUserMembershipForAdmin = async (req, res) => {
        try {
                const result = await userMembership.find({}).populate('servicePlan user')
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({ message: err.message })
        }
}