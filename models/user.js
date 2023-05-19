const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema ({ 
    usernam:  {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
        },

        thoughts: [
            {
                type:  Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

    userSchema
        .virtual('friendCount')
        .get(function () {
            return this.friends.length;
        });


    const User = model('user', userSchema);

    module.exports = User;