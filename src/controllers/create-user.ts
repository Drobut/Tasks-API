import { Request, Response } from "express";
import { User } from "../models/user";
import { saveUserSync, getUserSync } from "../db/users";

export class CreateUserController {
  create(request: Request, response: Response) {
    const { name, email, password, errand } = request.body;

    const user = new User(name, email, password, errand);

    const users = getUserSync();

    users.push(user);

    saveUserSync(users);

    return response.json(user.toJson());
  }
}
