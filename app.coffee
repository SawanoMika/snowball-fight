express = require 'express'
app = express.createServer()
mongourl = null

############ Configure

app.configure ->
  app.use '/static', express.static __dirname + '/static'
  app.use express.bodyParser()
  app.use app.router

app.configure 'development', ->
  mongourl = "mongodb://localhost:27017/db"
  app.use express.errorHandler dumpException: true, showStack: true
  app.set 'view options', pretty: true

app.configure 'production', ->
  app.use express.errorHandler()
  mongourl = process.env.MONGOHQ_URL

############ Visit mongodb

recordScore = (req, res) ->
  # Connect to the DB and auth
  require('mongodb').connect mongourl, (err, conn) ->
    conn.collection 'scores', (err, coll) ->
      # Simple object to insert: ip address and date
      # object_to_insert = ip: req.connection.remoteAddress, ts: new Date()
      object_to_insert =
        "ip": req.connection.remoteAddress,
        "user-agent": req.get("User-Agent"),
        "log": req.body.log,
        "mobile": req.body.mobile,
        "name": req.body.name,
        "ts": new Date(),
        "score": require('./score').calcScore(req.body.log)

      # Insert the object then print in response
      # Note the _id has been created
      coll.insert object_to_insert, safe: true, (err) ->
        if err
          res.send(500, code: 500, msg: err.message)
        else
          res.send(200, code: 200, msg: "success!")

BOARD_FIELDS =
  'name': 1,
  'score': 1,
  '_id': 0

printBoard = (req, res) ->
  require('mongodb').connect mongourl, (err, conn) ->
    conn.collection 'scores', (err, coll) ->
      coll.find {}, fields: BOARD_FIELDS, limit: 10, sort: [['score', 'desc']], (err, cursor) ->
        cursor.toArray (err, items) ->
          res.json items

############ Routes

app.get '/', (req, res) ->
  res.send "Hello World!"

app.post '/score', (req, res) ->
  recordScore req, res

app.get '/board', (req, res) ->
  printBoard req, res

############ Listen

app.listen process.env.VCAP_APP_PORT or 3000