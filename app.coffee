express = require 'express'
app = express()

##### Toggle this comment if connecting to MongoDB needed
# database = require 'database'

############ Configure

mongourl = null

app.configure ->
  app.use '/static', express.static __dirname + '/static'
  app.use express.bodyParser()
  app.use app.router

app.configure 'development', ->
  mongourl = "mongodb://localhost/db"
  app.use express.errorHandler dumpException: true, showStack: true
  app.set 'view options', pretty: true

app.configure 'production', ->
  app.use express.errorHandler()
  mongourl = process.env.MONGOHQ_URL

############ Routes

app.get '/', (req, res) ->
  #require('fs').readFile __dirname + '/static/index.html', 'utf-8', (err, text) ->
  require('fs').readFile __dirname + '/assets/index.html', 'utf-8', (err, text) ->
    res.send text

# app.post '/score', (req, res) ->
#   recordScore req, res

# app.get '/board', (req, res) ->
#   printBoard req, res

############ Listen

app.listen process.env.VCAP_APP_PORT or 3000
console.log 'Server now listening to port 3000'