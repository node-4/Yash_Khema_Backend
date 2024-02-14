const multer = require('multer')
const path = require('path');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/profile')
	},

	filename: function (req, file, cb) {
		cb(null, 'profile' + '-' + Date.now() + path.extname(file.originalname))
	}
})
var storage1 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/banner')
	},
	filename: function (req, file, cb) {
		// console.log("filename", file.originalname)
		cb(null, 'banner' + '-' + Date.now() + path.extname(file.originalname))
	}
})
var storage3 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/category')
	},

	filename: function (req, file, cb) {
		cb(null, 'category' + '-' + Date.now() + path.extname(file.originalname))
	}
})
var storage4 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/brand')
	},
	filename: function (req, file, cb) {
		// console.log("filename", file.originalname)
		cb(null, 'brand' + '-' + Date.now() + path.extname(file.originalname))
	}
})
var storage5 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/blog')
	},
	filename: function (req, file, cb) {
		// console.log("filename", file.originalname)
		cb(null, 'blog' + '-' + Date.now() + path.extname(file.originalname))
	}
})
var storage6 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/product')
	},
	filename: function (req, file, cb) {
		// console.log("filename", file.originalname)
		cb(null, 'product' + '-' + Date.now() + path.extname(file.originalname))
	}
})
var storage7 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/service')
	},
	filename: function (req, file, cb) {
		// console.log("filename", file.originalname)
		cb(null, 'service' + '-' + Date.now() + path.extname(file.originalname))
	}
})
var storage8 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/public/periodicservice')
	},
	filename: function (req, file, cb) {
		// console.log("filename", file.originalname)
		cb(null, 'periodicService' + '-' + Date.now() + path.extname(file.originalname))
	}
})
module.exports = {
	upload_profile: multer({ storage: storage }),
	upload_banner: multer({ storage: storage1 }),
	upload_category: multer({ storage: storage3 }),
	upload_brand: multer({ storage: storage4 }),
	upload_blog: multer({ storage: storage5 }),
	upload_product: multer({ storage: storage6 }),
	upload_service: multer({ storage: storage7 }),
	upload_periodicservice: multer({ storage: storage8 }),



}
