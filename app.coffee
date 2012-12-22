app = require('express').createServer()
# mongo = null
mongourl = null

############ mongodb configure
app.configure 'development', ->
  mongourl = "mongodb://#{obj.hostname}:#{obj.port}/#{obj.db}"
  # mongo = 
  #   "hostname": "localhost",
  #   "port": 27017,
  #   "username": "",
  #   "password": "",
  #   "name": "",
  #   "db": "db"
app.configure 'production', ->
  mongourl = process.env.MONGOHQ_URL
  # env = JSON.parse process.env.VCAP_SERVICES
  # mongo = env['mongodb-1.8'][0]['credentials']

# generate_mongo_url = (obj) ->
#   obj.hostname = obj.hostname or 'localhost'
#   obj.port = obj.port or 27017
#   obj.db = obj.db or 'test'
#   if obj.username and obj.password
#     "mongodb://#{obj.username}:obj.password@#{obj.hostname}:#{obj.port}/#{obj.db}"
#   else
#     "mongodb://#{obj.hostname}:#{obj.port}/#{obj.db}"

# mongourl = generate_mongo_url mongo

############ Visit mongodb

record_visit = (req, res) ->
  # Connect to the DB and auth
  require('mongodb').connect mongourl, (err, conn) ->
    conn.collection 'ips', (err, coll) ->
      # Simple object to insert: ip address and date
      object_to_insert = ip: req.connection.remoteAddress, ts: new Date()

      # Insert the object then print in response
      # Note the _id has been created
      coll.insert object_to_insert, safe: true, (err) ->
        res.writeHead 200, 'Content-Type': 'text/plain'
        res.write JSON.stringify object_to_insert
        res.end '\n'

print_visits = (req, res) ->
  # Connect to the DB and auth
  require('mongodb').connect mongourl, (err, conn) ->
    conn.collection 'ips', (err, coll) ->
      coll.find {}, limit: 10, sort: [['_id', 'desc']], (err, cursor) ->
        cursor.toArray (err, items) ->
          res.writeHead 200, 'Content-Type': 'text/plain'
          for i in [0...items.length]
            res.write "#{JSON.stringify(items[i])}\n"
          res.end()

############ Routes
app.get '/', (req, res) ->
  record_visit req, res

app.get '/history', (req, res) ->
  print_visits req, res

############ Listen
app.listen process.env.VCAP_APP_PORT or 3000