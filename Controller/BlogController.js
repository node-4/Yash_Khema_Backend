const  BlogService  = require('../Service/BlogService');

exports.addBlog = async (req, res) => {
  const payload = req.body
  if (req.file) {
    payload.blogImg = req.file.path
  }
  const result = await BlogService.addBlog(payload)
  if (result.success) {
    return res.status(result.status).json({success: result.success,status: result.status,data: result.data,message: result.message})
  } else {
    return res.status(result.status).json({succes: result.success,status: result.status,message: result.message})
  }
}

exports.getBlog = async (req, res,) => {
  try {
    let result = await BlogService.getBlog({})
    if (result.success) {

      return res.status(result.status).json({ message: result.message, success: result.success, status: result.status, data: result.data,})
    } else {
      return res.status(result.status).json({ message: result.message, success: result.success, status: result.status,})
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message
    })
  }
}

exports.updateBlog = async (req, res) => {
  try {
    const payload = req.body
    console.log(req.body);
    let blogId = req.params.blogid
    if (req.file) {
      payload.blogImg = req.file.path
    }
    let result = await BlogService.updateBlog(blogId, payload)
    if (result.success) {
      return res.status(result.code).json({ success: result.success, message: result.message, data: result.data
      })
    } else {
      return res.status(result.code).json({ success: result.success, message: result.error
      })
    }
  } catch (error) {
    throw error
  }
}

exports.deleteBlog = async (req, res, next) => {
  try {
    let blogId = req.params.blogid
    console.log(blogId)
    let result = await BlogService.deleteBlog(blogId)
    if (result.success) {
      return res.status(result.status).json({ success: result.success, status: result.status, message: result.message, data: result.data
      })
    } else {
      return res.status(result.status).json({ success: result.success, status: result.status, message: result.error
      })
    }

  } catch (error) {
    next(error)
  }
}