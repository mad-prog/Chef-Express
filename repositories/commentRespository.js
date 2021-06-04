const Comment = require("../models/Comment");

exports.insertComment = async (comment) => {
  return await Comment.create(comment);
};

exports.findAllComments = async () => {
  return await Comment.findAll();
};

exports.findCommentById = async (id) => {
  return await Comment.findByPk(id);
};

exports.deleteComment = async (id) => {
  const destroyedComment = await Comment.destroy({ where: { id } });
  return destroyedComment;
};

exports.updateComment = async (id, commentInfo) => {
  return await Comment.update(commentInfo, { where: { id } });
};
