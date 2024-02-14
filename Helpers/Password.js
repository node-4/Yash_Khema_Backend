const bcrypt = require('bcryptjs');

exports.hashPassword = async (password, salt) => {
	const hash = await bcrypt.hash(password, salt);
	return hash
}

exports.isValidPassword = async (password, hashdPassword) => {
	try {
		return isValid = await bcrypt.compare(password, hashdPassword)


	} catch (error) {
		console.log(error)
		throw error

	}
}