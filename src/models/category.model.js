
import mongoose from "mongoose" ;
const Schema = mongoose.Schema ;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

CategorySchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

export default mongoose.model("category",CategorySchema);