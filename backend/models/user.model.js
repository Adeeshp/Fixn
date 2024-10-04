import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
userId:{
    type: Int16Array,
    require: true
},
firstname: {
    type: String,
    require: true
},
lastname: {
    type: String,
    require: true
},
email: {
    type: String,
    require: true
}
}, {
    timestamp: true // createdAt, updatedAt
});

const User = mongoose.model('User', userSchema);
export default User;

