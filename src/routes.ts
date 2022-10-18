import { Express } from "express";
import { CreateErrandController } from "./controllers/create-errand";
import { CreateUserController } from "./controllers/create-user";
import { DeleteErrandController } from "./controllers/delete-errand";
import { FilterListController } from "./controllers/get-filter-tasks";
import { GetListController } from "./controllers/get-lists";
import { LoginuserController } from "./controllers/login-user";
import { UpdateErrandController } from "./controllers/update-errand";
import { UserValidateMiddleware } from "./middlewares/user-validate";

export default (app: Express) => {
  app.get("/", (request, response) => response.send("ESTÁ FUNCIONANDO"));
  app.post("/user", new CreateUserController().create);
  app.post(
    "/user/:id/errand",
    new UserValidateMiddleware().validate,
    new CreateErrandController().creatErrand
  );
  app.put(
    "/user/:id/errand/:idErrand",
    new UserValidateMiddleware().validate,
    new UpdateErrandController().UpdateErrand
  );
  app.delete(
    "/user/:id/errand/:idErrand",
    new UserValidateMiddleware().validate,
    new DeleteErrandController().DeleteErrand
  );
  app.get(
    "/user/:id",
    new UserValidateMiddleware().validate,
    new GetListController().GetErrand
  );
  app.get("/user/:id/filter", new FilterListController().Filter);
  app.post("/user/login", new LoginuserController().LoginUser);
};
