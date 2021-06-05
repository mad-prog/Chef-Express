const { response } = require("express");
const commentRepository = require("../repositories/commentRespository");
const {
  insertCommentSchema,
  updateCommentSchema,
} = require("../validations/commentValidation");

exports.addComment = async (comment) => {
  const validatedComment = await insertCommentSchema.validateAsync(comment);
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
  console.log(commentInfo);
  const validatedCommentInfo = await updateCommentSchema.validateAsync(
    commentInfo
  );
  if (!validatedCommentInfo) throw new Error("not validated");
  await commentRepository.updateComment(id, validatedCommentInfo);
};
