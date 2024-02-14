const subSkill = require('../Models/subSkill');
const skill = require('../Models/skill');

exports.addSkills = async (payload) => {
	try {
		const result = await new skill(payload)
		result.save()
		if (result) {
			return { success: true, status: 200, data: result, message: "Add skills successfully" }
		} else {
			return { success: false, status: 400, message: "Something Went Wrong" }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getSkills = async () => {
	try {
		const result = await skill.find();
		if (result.length > 0) {
			return { success: true, status: 200, data: result, message: "Skills data found successfully" }
		} else {
			return { success: false, status: 404, message: "Skills data not found." }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getSkillsById = async (payload) => {
	try {
		const result = await skill.findById(payload);
		if (result) {
			return { success: true, status: 200, data: result, message: "Skills data found successfully" }
		} else {
			return { success: false, status: 404, message: "Skills data not found." }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.addSubSkill = async (payload) => {
	try {
		const result = await new subSkill(payload)
		result.save()
		if (result) {
			return { success: true, status: 200, data: result, message: "Add subSkill successfully" }
		} else {
			return { success: false, status: 400, message: "Something Went Wrong" }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getSubSkill = async (payload) => {
	try {
		console.log(payload);
		const result = await subSkill.find({ skill: payload });
		if (result.length > 0) {
			return { success: true, status: 200, data: result, message: "SubSkill data found successfully" }
		} else {
			return { success: false, status: 404, message: "SubSkill data not found." }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getsubSkillById = async (payload) => {
	try {
		const result = await subSkill.findById(payload);
		if (result) {
			return { success: true, status: 200, data: result, message: "SubSkill data found successfully" }
		} else {
			return { success: false, status: 404, message: "SubSkill data not found." }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}