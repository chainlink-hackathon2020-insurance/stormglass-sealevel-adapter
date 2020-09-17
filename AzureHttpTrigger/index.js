const createRequest = require('./../index').createRequest

module.exports = function (context, req) {
  context.log('Stormglass adapter request...')

  createRequest(req.body, (statusCode, data) => {
    context.log(statusCode)
    context.log(JSON.stringify(data))
    context.res = {
      status: statusCode,
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    context.done();
  })
}
