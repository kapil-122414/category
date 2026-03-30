const mongoose=require ("mongoose");

const connectdb= async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/caregorydb")
        console.log("databse connected");
    }
    catch(error){
        console.error(error.Message);
        process.exit(1);
    }
}  

 module.exports=connectdb;