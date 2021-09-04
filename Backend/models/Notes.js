import mongoose from 'mongoose';

const NotesSchema = new Schema({
    title: {
        type: string,
        require: true
    },
    description: {
        type: string,
        require: true
    },
    tag: {
        type: string,
        default:"General"
    },
    date: {
        type: date,
        default: date.now
    }
});

module.exports = mongoose.model('notes',NotesSchema)