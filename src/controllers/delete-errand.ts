import { Request, Response } from "express";
import { saveUserSync, getUserSync } from "../db/users";

export class DeleteErrandController {
  DeleteErrand(request: Request, response: Response) {
    const { id, idErrand } = request.params;

    const userDb = getUserSync();

    const user = userDb.find((users) => users.id === id);

    const errand = userDb.find((ids) =>
      ids.errands.find((task) => task.idErrand === idErrand)
    );

    if (!errand) {
      return response.status(404).json({ error: "task not found" });
    }

    try {
      user?.deleteErrand(idErrand);
      saveUserSync(userDb);
    } catch (err: any) {
      return response.status(400).json({ err: err.message });
    }
    return response.json(user);
  }
}
