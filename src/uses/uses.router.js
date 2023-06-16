const router = require("express").Router()
const methodNotAllowed = require("../methodNotAllowed")
const controller = require("./uses.controller")

router.route("/")
  .get(controller.list)
  .all(methodNotAllowed)

router.route("/:useId")
  .get(controller.read)
  .delete(controller.delete)
  .all(methodNotAllowed)

module.exports = router
