const { response } = require("express");
const commentRepository = require("../repositories/commentRespository");
const {
  insertCommentSchema,
  updateCommentSchema,
} = require("../validations/commentValidation");

exports.addComment = async (comment) => {
  const validatedComment = insertCommentSchema.validateAsync(comment);
  return await commentRepository.insertComment(validatedComment);
};

exports.getAllComments = async () => {
  return await commentRepository.findAllComments();
};

exports.getComment = async (id) => {
  return await commentRepository.findCommentById(id);
};

exports.removeComment = async (id) => {
  return await commentRepository.deleteComment(id);
};

exports.editComment = async (id, commentInfo) => {
  //TODO

  //const validatedCommentInfo = updateCommentSchema.validateAsync(commentInfo);

  //console.log(validatedCommentInfo);
  //if (!validatedCommentInfo) throw new Error("not validated");
  return await commentRepository.updateComment(id, commentInfo);
};
