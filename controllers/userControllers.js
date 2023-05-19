const { User, Thought } = require('../models');
const router = require('express').Router();

// get all the users
router.get('/', async (req, res) => {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

// get one user ID
router.get('/:userId', async (req, res) => {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then((user) => 
        !user  
            ? res.status(400).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});

// post (create)
router.put('/:userId', async (req, res) => {
    User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
});

// put (update)user by id
router.put('/:userId', async (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
    )
    .then((user) => 
        !user
            ? res.status(404).json({  message: 'No user with this id!'})
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete User by ID
router.delete('/:userId', async (req, res) => {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
});

// post api/user/users/:userId/friends/:firendId
router.put('/:userId/friends/:friendId', async (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
    ).populate("friends")
    .then((user) => 
        !user
            ? res.status(404).json({
                message: 'no user with that ID',
                })
            : res.json(user)    
    ).catch((err) => { 
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;