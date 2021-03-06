const express = require("express");
const passport = require("passport");

const router = express.Router();

function configureRouter({ cartController }) {
  router.get("/", cartController.index.bind(cartController));
  router.get("/:userId", cartController.getByUserIdOrCreate.bind(cartController));
  router.post(
    "/product/:productId",
    passport.authenticate("jwt", { session: false }),
    cartController.addProduct.bind(cartController)
  );
  router.put(
    "/product/:productId",
    passport.authenticate("jwt", { session: false }),
    cartController.editProduct.bind(cartController)
  );
  router.delete(
    "/product/:productId",
    passport.authenticate("jwt", { session: false }),
    cartController.removeProduct.bind(cartController)
  );
  router.post(
    "/merge",
    passport.authenticate("jwt", { session: false }),
    cartController.merge.bind(cartController)
  );
  return router;
}

module.exports = configureRouter;
