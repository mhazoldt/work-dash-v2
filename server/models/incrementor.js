let mongoose = require('mongoose')


let IncrementorSchema = mongoose.Schema({
    collection_name: {
        type: "string",
        index: "true",
        unique: true

    },
    last_id: {
        type: "number"
    }
})

let Incrementor = mongoose.model('Incrementor', IncrementorSchema)


Incrementor.createIncrementor = (newIncrementor, callback) => {

    newIncrementor.save(callback)

}

Incrementor.getNextId = (collection_name, callback) => {

    Incrementor.findOne({ collection_name: collection_name }, function (err, doc){
        let nextId = doc.last_id + 1
        console.log("###############", nextId)
        callback(nextId)
      });

}

Incrementor.increment = (collection_name, callback) => {

    Incrementor.findOne({ collection_name: collection_name }, function (err, doc){
        doc.last_id = doc.last_id + 1
        doc.save();
        callback(doc)
      });


}

Incrementor.containsDocument = (collection_name, callback) => {

    Incrementor.findOne({ collection_name: collection_name }, function (err, doc){
        if(doc) {
            callback(err, true)
        } else {
            callback(err, false)
        }
        
      });


}


module.exports = Incrementor