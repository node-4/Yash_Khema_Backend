const subCategory = require('../Models/subCatgory');
const Category = require('../Models/Category');

exports.AddSubCategory = async (req, res) => {
        try {
                let result = await Category.findOne({ _id: req.body.catgoryId })
                if (!result) {
                        return { success: false, status: 404, error: 'Record Not Found!!!' }
                } else {
                        const data = { title: req.body.title, catgory: req.body.catgoryId, }
                        const result1 = await subCategory.create(data);
                        if (result1) {
                                return res.status(200).json({ success: true, data: result1, status: 200, message: "Successfully Found Data !!" })
                        } else {
                                return res.status(404).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                        }
                }
        } catch (err) {
                return res.status(400).json({ message: err.message })
        }
}
exports.getAll = async (req, res) => {
        try {
                if (req.query.catgory != (null || undefined)) {
                        const result = await subCategory.find({ catgory: req.query.catgory }).populate('catgory');
                        if (result) {
                                return res.status(200).json({ success: true, data: result, status: 200, message: "Successfully Found Data !!" })
                        } else {
                                return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                        }
                } else {
                        const result = await subCategory.find().populate('catgory');
                        if (result) {
                                return res.status(200).json({ success: true, data: result, status: 200, message: "Successfully Found Data !!" })
                        } else {
                                return res.status(200).json({ success: false, status: 404, error: 'Record Not Found!!!' })
                        }
                }
        } catch (err) {
                console.error(err);
                return res.status(400).json({
                        message: err.message
                })
        }
}
exports.DeleteSubCategory = async (req, res) => {
        try {
                let result = await subCategory.findByIdAndDelete({ _id: req.params.id });
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
exports.getById = async (req, res) => {
        try {
                const result = await subCategory.findById({ _id: req.params.Id }).populate('catgory');
                if (result) {
                        return res.status(200).json({ success: true, data: result, status: 200, message: "SubCagegory Successfully Found Data !!" })
                } else {
                        return res.status(200).json({ success: false, status: 404, error: 'SubCagegory Not Found!!!' })
                }
        } catch (err) {
                console.error(error);
                return res.status(400).json({ message: err.message })
        }
}