import { Request, Response } from "express";
import { getUserSync } from "../db/users";

export class LoginuserController {
  LoginUser(request: Request, response: Response) {
    const { email, password } = request.body;

    const userDb = getUserSync();
    const user = userDb.find(
      (users) => users.email === email && users.password === password
    );

    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }

    return response.json(user.toJsonId());
  }
}
