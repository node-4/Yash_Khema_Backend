exports.invalidRoute = async (req, res, next) => {
	res.status(404).json({
		success: false,
		message: "Route Not Found"
	})
}

exports.errorHandler = async (req, res, next) => {
	if (error.name === 'ErrormongoEroor') {
		res.status(500).json({
			success: false,
			message: 'Error:' + error.message
		})
	} else {
		res.status(500).json({
			success: false,
			Message: 'Error:' + error.message

		})
	}
}

