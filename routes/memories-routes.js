const express = require('express')
const memoriesControllers = require('../controllers/memories-controllers')

const router = express.Router()

const upload = require('../multer-config')

router.get('/', memoriesControllers.getMemories)
router.post('/', upload.single('img'), memoriesControllers.createMemories)
router.patch('/', memoriesControllers.updateMemory)
router.delete('/', memoriesControllers.deleteMemory)

module.exports = router