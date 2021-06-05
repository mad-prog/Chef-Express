const { response } = require("express");
const commentRepository = require("../repositories/commentRespository");
const {
  insertCommentSchema,
  updateCommentSchema,
} = require("../validations/commentValidation");
const mealRepository = require("../repositories/mealRepository");
const { use } = require("../routes/users");

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

//Deletions by admin/mod/comment owner, meal owner
exports.removeComment = async (user, id) => {
  const storedComment = await commentRepository.findCommentById(id);
  if (!storedComment) throw new Error("Comment not found");
  const commentAuthor = storedComment.UserId;
  const storedMeal = await mealRepository.findMealById(storedComment.MealId);
  const mealAuthor = storedMeal.UserId;
  if (
    commentAuthor !== user.id &&
    mealAuthor !== user.id &&
    user.role !== "admin" &&
    user.role !== "mod"
  )
    throw new Error("You're not authorized to delete this");
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
