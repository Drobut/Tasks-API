import { Request, Response } from "express";
import { saveUserSync, getUserSync } from "../db/users";

export class CreateErrandController {
  creatErrand(request: Request, response: Response) {
    const { id } = request.params;
    const { title, message, archive } = request.body;

    const userDb = getUserSync();

    const user = userDb.find((users) => users.id === id);

    try {
      user?.createErrand(title, message, archive);
      saveUserSync(userDb);
    } catch (err: any) {
      return response.status(400).json({ err: err.message });
    }
    return response.json(user);
  }
}
