import { Request, Response } from "express";
import { getUserSync } from "../db/users";
import { User } from "../models/user";

export class FilterListController {
  Filter(request: Request, response: Response) {
    const { id } = request.params;
    const { title, archive } = request.query;

    let data: any;
    let search = false;

    const userDb = getUserSync();
    data = userDb.find((users) => users.id === id);

    if (title || archive) {
      data = data?.errands.filter((tsk: any) => {
        let filterTitle = true;
        let filterArchive = true;
        search = true;

        if (title) {
          filterTitle = tsk.title
            .toLowerCase()
            .includes(title.toString().toLowerCase());
        }

        if (archive) {
          filterTitle = tsk.archive
            .toLowerCase()
            .includes(archive.toString().toLowerCase());
        }

        return filterTitle && filterArchive;
      });
    }

    if (!search) {
      return response.json(data?.errands);
    } else {
      return response.json(data);
    }
  }
}
