const {addPostService} = require('../services/index')

const addPost = async (req, res) => {
    const response = await addPostService(req.body)
}

module.exports = {
    addPost
}