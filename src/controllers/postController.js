const Post = require("../models/postModel");
const User = require("../models/userModel");
const errorHandler = require("../errors/errorHandler");
const pushToQ = require("../queue/pushToQueueHandler");
const { log } = require("../modules/logModule");

const saltValue = 12;
const tokenDuration = "3h";
const refreshTokenDuration = "30d";

const findAll = async (request, reply) => {
  try {
    const id = request.headers.authorization;
    if (id == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(id).exec();

      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const findAllPosts = await Post.find().exec();
        if (!findAllPosts) {
          return await errorHandler(
            404,
            "posts-not-found",
            true,
            request,
            reply,
          );
        }

        await reply.code(200).send({
          success: true,
          data: findAllPosts,
        });
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

const findOne = async (request, reply) => {
  try {
    const userId = request.headers.authorization;
    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const { id } = request.params;
        const fındOnePost = await Post.findById(id).exec();

        if (!fındOnePost) {
          return await errorHandler(
            404,
            "post-not-found",
            true,
            request,
            reply,
          );
        }
        await reply.code(200).send({
          success: true,
          data: fındOnePost,
        });
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

const createPost = async (request, reply) => {
  try {
    const userId = request.headers.authorization;
    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const createdPost = await Post.create({
          ...request.body,
        });

        if (!createdPost) {
          return await errorHandler(
            400,
            "post-not-created",
            true,
            request,
            reply,
          );
        }
        await reply.code(201).send({
          success: true,
          data: createdPost,
        });
      }
    }
  } catch (error) {
    return await errorHandler(400, error, false, request, reply);
  }
};

const updatePost = async (request, reply) => {
  try {
    const userId = request.headers.authorization;
    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const { id } = request.params;
        const findPost = await Post.findById(id).exec();

        if (!findPost) {
          return await errorHandler(
            404,
            "post-not-found",
            true,
            request,
            reply,
          );
        } else {
          const updatedPost = await findPost.update({
            ...request.body,
          });

          if (!updatedPost) {
            return await errorHandler(
              400,
              "post-update-failed",
              true,
              request,
              reply,
            );
          } else {
            await reply.code(200).send({
              success: true,
              data: updatedPost,
            });
          }
        }
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

const deletePost = async (request, reply) => {
  try {
    const userId = request.headers.authorization;
    if (userId == null) {
      return await errorHandler(401, "unauthorized", true, request, reply);
    } else {
      const findUser = await User.findById(userId).exec();

      if (!findUser) {
        return await errorHandler(401, "unauthorized", true, request, reply);
      } else {
        const { id } = request.params;
        const findPost = await Post.findById(id).exec();

        if (!findPost) {
          return await errorHandler(
            404,
            "post-not-found",
            true,
            request,
            reply,
          );
        } else {
          const deletedPost = await findPost.deleteOne();

          if (!deletedPost) {
            return await errorHandler(
              400,
              "post-delete-failed",
              true,
              request,
              reply,
            );
          }
          await reply.code(200).send({
            success: true,
            data: findUser,
          });
        }
      }
    }
  } catch (error) {
    return await errorHandler(404, error, false, request, reply);
  }
};

module.exports = {
  findAll,
  findOne,
  createPost,
  updatePost,
  deletePost,
};
