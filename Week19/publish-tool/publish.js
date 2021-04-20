const http = require('http')
const fs = require('fs')
const archiver = require('archiver')
const child_process = require('child_process')
const queryString = require('querystring')

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.2ca49cf972b4d6a7`)


http.createServer(function(req, res) {
  let query = queryString.parse(req.url.match(/^\/\?([\s\S]+)$/)[1])
  publish(query, token)
}).listen(8083)

function publish(token) {
  let request = http.request({
    hostname: "127.0.0.1",
    port: "8082",
    method: "POST",
    path: `/publish?token=${token}`,
    headers: {
      'Content-Type': 'application/octet-stream'
    },
  }, res => {
    console.log(res)
  })

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.directory('./sample/', false)
  archive.finalize()
  archive.pipe(request)

}