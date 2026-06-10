import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },   
}, { timestamps: true}
);

projectSchema.methods.incrementViewCount = function () {
    this.viewCount += 1;
    return this.save();
};

export default mongoose.model('Project', projectSchema);