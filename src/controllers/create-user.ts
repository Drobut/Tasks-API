import { Request, Response } from "express";
import { User } from "../models/user";
import { saveUserSync, getUserSync } from "../db/users";

export class CreateUserController {
  create(request: Request, response: Response) {
    const { name, email, password, errand } = request.body;

    const users = getUserSync();

    const db = users.find((users) => users.email === email);

    if (db) {
      return response.status(404).json({ error: "user exists" });
    }

    const user = new User(name, email, password, errand);

    users.push(user);

    saveUserSync(users);

    return response.json(user.toJsonId());
  }
}
