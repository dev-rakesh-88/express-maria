const {signUpService, signUpOtpService, signUpConfirmService} = require('../services/interviewer.Service')

const signUp = async (req, res) => {
    try {
        const response = await signUpService(req.body)
        await signUpOtpService(req.body,response)
        return res.send(response)
    } catch (error) {
        return res.status(400).json({
            success: true,
            message:"Something wrong on our side",
            error:error?.message
        })
    }
}
const signUpConfirm = async(req, res) => {

    try {
        const response = await signUpConfirmService(req.body)
        return res.send(response)
    } catch (error) {
        return res.send(error.message)
    }
}
module.exports = {
    signUp,signUpConfirm
}