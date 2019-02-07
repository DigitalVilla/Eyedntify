// eslint-disable-next-line 
const DBMongo = [
  "mongodb://root:toor1212@127.0.0.1:27017/eyedentify",//local
  "mongodb://root:toor1212@ds121382.mlab.com:21382/eyedentify"//server
]
module.exports = {
  database : DBMongo[0],
  secret: "Eyedentify_by_DigitalVilla" 
}
