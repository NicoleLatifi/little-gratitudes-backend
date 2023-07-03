### Getting started:
`npm install`

### To start the mongodb server locally run:
`brew services restart mongodb-community`

### To start the node server run:
`nodemon index.js`

### To connect to the MongoDB database:
`mongosh "mongodb://localhost:27017/gratitude-app"`

Note: I had to connect to the MongoDB database and run `db.gratitudeentries.dropIndex("gratitudeEntry_1")` when I ran into the error `MongoServerError: E11000 duplicate key error collection: gratitude-app.gratitudeentries index: gratitudeEntry_1 dup key: { gratitudeEntry: null }`. Hopefully this was a one time error and I can delete this note soon.