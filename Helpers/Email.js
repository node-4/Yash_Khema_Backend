const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
	host: "smtp.sendgrid.net",
	port: 587,
	auth: {
		user: "apikey",
		pass: "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"
	}
})

exports.sendMail = async function (email, body, to) {
	try {
		await transport.sendMail({
			from: "nishantflyweis@gmail.com",
			to: email,
			subject: "OTP mail",
			text: body
		})
	} catch (error) {
		console.log(error)
		throw error;
	}
}