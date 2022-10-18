import { Request, Response } from "express";
import { getUserSync } from "../db/users";

export class GetListController {
  GetErrand(request: Request, response: Response) {
    const { id } = request.params;

    const userDb = getUserSync();
    const user = userDb.find((users) => users.id === id);

    return response.json(user?.errands);
  }
}
