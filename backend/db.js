const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/diaryOnCloud"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successful")
    })
}

module.exports=connectToMongo;