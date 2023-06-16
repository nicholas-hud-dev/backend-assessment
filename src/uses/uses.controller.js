const uses = require("../data/uses-data")

function list(req, res) {
  res.json({ data: uses })
}

function useExists(req, res, next) {
  const useId = req.params.useId
  const foundUse = uses.find((use) => useId == use.id)
  if (foundUse) {
    return next()
  }
  return next({
    status: 404,
    message: `Use not found: ${req.params.useId}`
  })
}

function read(req, res) {
  let { data: { time } = {} } = req.body;
  time = Date.now()
  const useId = req.params.useId
  const foundUse = uses.find((use) => useId == use.id)
  res.json({ data: foundUse, time: time })
  }

function destroy(req, res) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  delete: [useExists, destroy],
}