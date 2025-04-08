import Comment from '../models/Comment.js';

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Comment yo`q' });
  }
};

export async function getCommentById(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment Topilmadi' });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const createComment = async (req, res) => {
  try {
    const comments = await Comment.insertMany(req.body.comments);
    res.status(201).json(comments);
  } catch (err) {
    res.status(400).json({ error: 'Comment yaratilmadi' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update comment' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment yopilmadi' });
    }
    res.json({ message: 'Comment o`chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Comment ochirilmadi' });
  }
};
