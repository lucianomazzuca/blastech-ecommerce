const express = require("express");
const passport = require("passport");
const checkAdmin = require("../../../middleware/checkAdmin");
const validationHandler = require("../../../utils/validationHandler");
// const categoryValidatorRules = require("../validations/validator");

const router = express.Router();

function configureRouter({ categoryController }) {
  router.get("/", categoryController.index.bind(categoryController));
  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    categoryController.save.bind(categoryController)
  );
  router.get("/:id", categoryController.getById.bind(categoryController));
  router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    categoryController.edit.bind(categoryController)
  );
  router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    checkAdmin,
    categoryController.delete.bind(categoryController)
  );

  return router;
}

module.exports = configureRouter;
