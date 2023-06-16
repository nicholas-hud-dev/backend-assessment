const router = require("express").Router({ mergeParams: true})
const methodNotAllowed = require("../methodNotAllowed")
const controller = require("./urls.controller")
const usesRouter = require("../uses/uses.router")

router.route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed)

router.route("/:urlId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed)

router.use("/:urlId/uses", controller.urlExists, usesRouter)


module.exports = router

/* app.post('/urls', (req, res) => {
  // TODO: Create a new short URL
});

app.get('/urls/:urlId', (req, res) => {
  // TODO: Retrieve a short URL by ID
});

app.put('/urls/:urlId', (req, res) => {
  // TODO: Update a short URL by ID
});

app.get('/urls', (req, res) => {
  // TODO: Retrieve a list of all short URLs
});

app.get('/urls/:urlId/uses', (req, res) => {
  // TODO: Retrieve a list of use metrics for a given short URL ID
});

app.get('/urls/:urlId/uses/:useId', (req, res) => {
  // TODO: Retrieve a use metric by ID for a given short URL ID
});
*/
