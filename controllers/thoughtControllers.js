const router = require('express').Router();
const  { User, Thought } = require('../models');


// get thoughts
router.get('/', async (req, res) => {
    Thought.find()
    .then((Thought) => res.json(Thought))
    .catch((err) => res.status(500).json(err));
});


// get thought by id
router.get('/:thoughtId', async (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
})

// post new thought and push id
router.post('/', async (req, res) => {
    Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: dbThoughtData._id} },
                { new: true }
            );
        }).then((dbUserData) => res.status(dbUserData))
        .catch((err) => {
            console.log(err);
            res.json(500).json(err);
        });
})


// put (update)
router.put('/:thoughtId', async (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }
    )
    .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought) 
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete thought
router.delete('/:thoughtId', async (req, res) => {
    Thought.findOneandRemove({ _id: req.params.thoughtId })
    .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought with this id!'}) 
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
});

// post(create)
router.post('/:thoughtId/reactions', async (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
})

// delete reaction
router.delete('/:thoughtId/reactions/reaction:id', async (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
    )
    .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
});

module.exports = router;