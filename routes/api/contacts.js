const express = require('express')
const {ctrl} = require("../../controllers")
const {validateBody, isValidId, authenticate} = require('../../middlewares')
const {addJoiSchema, updateFavoriteJoiSchema} = require('../../models')
const router = express.Router()

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', authenticate, isValidId, ctrl.getById)

router.post('/', authenticate, validateBody(addJoiSchema), ctrl.add)

router.delete('/:contactId', authenticate, isValidId, ctrl.remove)

router.put('/:contactId', authenticate, isValidId, validateBody(addJoiSchema), ctrl.update)

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(updateFavoriteJoiSchema), ctrl.updateFavorite)

module.exports = router
