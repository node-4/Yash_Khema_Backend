const skillService = require('../Service/skillService')

exports.addSkills = async (req, res) => {
	if (req.file) {
		req.body.image = req.file ? req.file.path : "";
	}
	const payload = req.body
	const result = await skillService.addSkills(payload)
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}
exports.getSkills = async (req, res) => {
	const result = await skillService.getSkills()
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}
exports.getSkillsById = async (req, res) => {
	const result = await skillService.getSkillsById(req.params.id)
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}
exports.addSubSkill = async (req, res) => {
	if (req.file) {
		req.body.image = req.file ? req.file.path : "";
	}
	const payload = req.body
	const result = await skillService.addSubSkill(payload)
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}
exports.getSubSkill = async (req, res) => {
	const result = await skillService.getSubSkill(req.params.skill)
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}
exports.getsubSkillById = async (req, res) => {
	const result = await skillService.getsubSkillById(req.params.id)
	if (result.success) {
		return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
	} else {
		return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
	}

}