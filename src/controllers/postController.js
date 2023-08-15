const Post = require("../models/postModel");
const User = require("../models/userModel");
const errorHandler = require("../errors/errorHandler");
// const pushToQ = require("../queue/pushToQueueHandler");

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
        const findOnePost = await Post.findById(id).exec();

        if (!findOnePost) {
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
          data: findOnePost,
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
          ...request.body.data,
          user: findUser,
        });

        if (!createdPost) {
          return await errorHandler(
            400,
            "post-not-created",
            true,
            request,
            reply,
          );
        } else {
          await reply.code(201).send({
            success: true,
            data: createdPost,
          });
        }
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
          const updatedPost = await Post.findByIdAndUpdate(
            findPost._id,
            {
              ...request.body,
            },
            { new: true },
          ).exec();

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
          const deletedPost = await Post.findByIdAndDelete(id).exec();

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
            data: findPost,
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
