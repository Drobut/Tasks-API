import { Request, Response, NextFunction } from "express";
import { getUserSync } from "../db/users";

export class UserValidateMiddleware {
  validate(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const userDb = getUserSync();

    const user = userDb.find((users) => users.id === id);

    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    return next();
  }
}
