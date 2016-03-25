var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    StorySchema = new Schema({
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User' // Referenced Schema
        },
        content: String,
        created: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('Story', StorySchema);