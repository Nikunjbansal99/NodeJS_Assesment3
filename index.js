var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var prompt = require('prompt-sync')();
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://cosmosmongodb99:XUcumV5VT8XbPnmle165JhyPFlFyQpnsFpkNjk4R1OOOP2nMVtUilWzqoWvqI8via8qceWFXw9crOTwVlg1XYw==@cosmosmongodb99.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmosmongodb99@';
console.log("Select: \n(A) For Add new Disease Symptoms and Precautions \n(S) For Search Disease Symptoms and Precautions")
const option = prompt("Enter A or S: ");

switch (option){
    case 'A':
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;

            var disease = prompt('Enter Disease : ');
            var description = prompt('Enter Description : ');
            var precaution_1 = prompt('Enter Precaution_1 : ');
            var precaution_2 = prompt('Enter Precaution_2 : ');
            var precaution_3 = prompt('Enter Precaution_3 : ');
            var precaution_4 = prompt('Enter Precaution_4 : ');

            var data_entry = { ID: "med1", Disease: disease, Description: description , Precaution_1: precaution_1, Precaution_2: precaution_2, Precaution_3: precaution_3, Precaution_4: precaution_4 }
            
            db.db('medicaldata').collection('symptom_description').insertOne(data_entry, function(err, res) {
                if (err) throw err;
                console.log("Disease Symptoms and Precautions", data_entry);
                console.log("Inserted Successfully");
                db.close();
            });
        });
        break;

    case 'S' : 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var words = prompt('Enter upto two words: ');
        var words_array = (words.split(" "));    
        while (words_array.length > 2){
            console.log('Maximum Two Words Permitted');
            var words = prompt('Enter upto two words: ');
            var words_array = (words.split(" "));
        }

        var query = {$or: [{Disease :{$regex : words_array[0]}},{Description :{$regex : words_array[0]}},{Precaution_1 :{$regex : words_array[0]}},{Precaution_2 :{$regex : words_array[0]}},{Precaution_3 :{$regex : words_array[0]}},{Precaution_4 :{$regex : words_array[0]}}]}
        db.db("medicaldata").collection("symptom_description").find(query).toArray(function(err, result) {
          if (err) throw err
          else if(result.length > 0){
                console.log("Following Documents are matched with ", words_array[0])
                console.log(result)
            }
        });

        if (words_array.length == 2){
            var query = {$or: [{Disease :{$regex : words_array[1]}},{Description :{$regex : words_array[1]}},{Precaution_1 :{$regex : words_array[1]}},{Precaution_2 :{$regex : words_array[1]}},{Precaution_3 :{$regex : words_array[1]}},{Precaution_4 :{$regex : words_array[1]}}]}
            db.db("medicaldata").collection("symptom_description").find(query).toArray(function(err, result) {
                if (err) throw err
                else if(result.length > 0){
                    console.log("Following Documents are matched with ", words_array[1])
                    console.log(result)
                }
            });
        }
        
        setTimeout(()=>{
          db.close()
        },4000)

      });
      break;

    default:
        console.log('Invalid Option Selected')
}