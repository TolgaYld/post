const postController = require("../controllers/postController");
module.exports = function (fastify, opts, done) {
  fastify.get("/findAll", postController.findAll);
  fastify.get("/find/:id", postController.findOne);
  fastify.post("/create", postController.createPost);
  fastify.patch("/update/:id", postController.updatePost);
  fastify.delete("/delete/:id", postController.deletePost);
  done();
};
