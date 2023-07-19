const routerInterviewer = require('express').Router()
const Post = require('../models/Post');
const {signUp, signUpConfirm} = require('../controllers/interviewer.controller')
routerInterviewer.post('/sign-up', signUp )
routerInterviewer.post('/sign-up-confirm', signUpConfirm )

module.exports = routerInterviewer;