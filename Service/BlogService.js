const blog = require('../Models/Blog');

exports.addBlog = async (payload) => {
  try {
    const result = await new blog(payload)
    result.save()
    if (result) {
      return {
        success: true,
        status: 200,
        data: result,
        message: "Add Blog Succefully"
      }
    } else {
      return {
        success: false,
        status: 400,
        message: "Somethng Went Wrong"
      }
    }

  } catch (error) {
    console.log(error);
    throw error
  }

}
exports.getBlog = async () => {
  try {
    result = await blog.find({})

    if (result) {
      return {
        success: true,
        status: 200,
        data: result,
        message: "Get Succefully"
      }
    } else {
      return {
        success: false,
        status: 400,
        message: "Something went Wrong"
      }
    }

  } catch (error) {
    console.log(error);
    throw error
  }
}
exports.updateBlog = async (blogId, payload) => {
  try {
    let result = await blog.findOneAndUpdate({ _id: blogId }, payload)
    if (result) {
      return {
        success: true,
        data: result,
        code: 200,
        message: 'Successfully updated'
      }
    } else {
      return {
        success: false,
        code: 404,
        error: 'Record Not Found!!!'
      }
    }

  } catch (error) {
    throw error
  }
}
exports.deleteBlog = async (blogId) => {
  console.log("id", blogId)
  let result = await blog.findOneAndDelete({ _id: blogId })
  if (result) {
    return {
      success: true,
      data: result,
      status: 200,
      message: 'Successfully Deleted'

    }
  } else {
    return {
      success: false,
      status: 404,
      error: 'Record Not Found!!!'
    }
  }
}