const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'Reaction is Required',
        maxLength: 280,
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


module.exports = reactionSchema;