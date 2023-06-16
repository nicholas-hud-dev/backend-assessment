const urls = require("../data/urls-data")
const uses = require("../data/uses-data")

function list(req, res) {
  res.json({ data: urls })
}

function urlExists(req, res, next) {
  const urlId = req.params.urlId
  const foundUrl = urls.find((url) => urlId == url.id)
  if (foundUrl) {
    res.locals.url = foundUrl
    return next()
  }
  return next({
    status: 404,
    message: `Url not found: ${req.params.urlId}`
  })
}

function read(req, res, next) {
  const { urlId } = req.params;
  const newUse = {
    id: uses.length + 1,
    urlId: Number(urlId),
    time: Date.now(),
  };
  uses.push(newUse);
  res.json({ data: res.locals.url });
}

function hrefExists(req, res, next) {    
  const { data: { href } = {} } = req.body;
  if (href) {
    res.locals.href = href
    return next()
  }
  next({
    status: 400,
    message: `href not found: ${res.locals.href}`
  })
}

function create(req, res) {
    const newUrl = {
      href: res.locals.href,
      id: urls.length + 1,
    }
    urls.push(newUrl)
    res.status(201).json({ data: newUrl });
}

function update(req, res) {
  const { data: { href } = {} } = req.body;
  const urlId = req.params.urlId
  const foundUrl = urls.find((url) => urlId == url.id)
  foundUrl.href = href
  res.json({ data: foundUrl })
}


module.exports = {
  list,
  read: [urlExists, read],
  create: [hrefExists, create],
  update: [urlExists, update],
  urlExists,
}
