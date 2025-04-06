import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add comment' });
  }
};

export const getCommentsByTask = async (req, res) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
