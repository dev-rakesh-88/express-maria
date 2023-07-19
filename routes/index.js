const router = require('express').Router()

const routerInterviewer = require('./Interviewer.Router')

router.use('/interviewer', routerInterviewer )

module.exports = router;