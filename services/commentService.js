const commentRepository = require("../repositories/commentRespository");
const {
  insertCommentSchema,
  updateCommentSchema,
} = require("../validations/commentValidation");
const mealRepository = require("../repositories/mealRepository");
const ERRORS = require("../utils/constants");
const HttpError = require("../utils/httpError");

exports.addComment = async (comment) => {
  const { content, rating } = comment;
  if (!content || !rating) throw new HttpError(400, ERRORS.INVALID_DATA);
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
  if (!storedComment) throw new HttpError(404, ERRORS.INVALID_COMMENT);

  const commentAuthor = storedComment.UserId;
  const storedMeal = await mealRepository.findMealById(storedComment.MealId);
  const mealAuthor = storedMeal.UserId;
  if (
    user.id !== commentAuthor &&
    user.id !== mealAuthor &&
    user.role !== "admin" &&
    user.role !== "mod"
  )
    throw new HttpError(401, ERRORS.INVALID_AUTHORIZATION);
  return await commentRepository.deleteComment(id);
};

exports.editComment = async (user, id, commentInfo) => {
  const storedComment = await commentRepository.findCommentById(id);
  if (!storedComment) throw new HttpError(404, ERRORS.INVALID_COMMENT);
  if (
    user.id !== storedComment.UserId &&
    user.role !== "admin" &&
    user.role !== "mod"
  )
    throw new HttpError(401, ERRORS.INVALID_AUTHORIZATION);
  const validatedCommentInfo = await updateCommentSchema.validateAsync(
    commentInfo
  );
  if (!validatedCommentInfo) throw new HttpError(400, ERRORS.INVALID_DATA);
  await commentRepository.updateComment(id, validatedCommentInfo);
};
