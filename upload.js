const fs = require('fs');
const readline = require('readline');
const Stream = require("stream");
const mongodb = require('mongodb'); 

const uri = 'mongodb://swott:tempPass38@ds157901.mlab.com:57901/swottbase';

mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, (err, mongoconnect) => {
  if (err) console.log('Error connecting to DB.');
  const connection = mongoconnect.db('swottbase');
  const collection = connection.collection('cardpool');
  console.log('DB connected');
  processFile('./entries.tsv', collection);
});

const capitalizeString = string => {
    const capitalizeVocab = vocab => 
        vocab.charAt(0).toUpperCase() + vocab.slice(1);
    return string.toLowerCase().split(' ').map( 
        x => x.split('(').map( 
            y => y.split(')').map(
                z => capitalizeVocab(z)
            ).join(')')
        ).join('(')
    ).join(' ');
        
}


const processFile = (inputFile, collection) => {

    instream = fs.createReadStream(inputFile),
    outstream = new Stream(),
    rl = readline.createInterface(instream, outstream);
     
    rl.on('line', line => {
        let [chapter, running, english, chinese_prev, swf, clip, dummy, chinese  ] = line.split("\t");
        if(running>=2) {
            english = capitalizeString(english);
            chinese = capitalizeString(chinese);
            collection.insert({english, chinese, clip});
            console.log(running, '|', english, '|', chinese, '|', clip);
        }
        
    });
    
    rl.on('close', () => {
        console.log('done reading file.');
    });
}

