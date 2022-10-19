"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterListController = void 0;
const users_1 = require("../db/users");
class FilterListController {
    Filter(request, response) {
        const { id } = request.params;
        const { title, archive } = request.query;
        let data;
        let search = false;
        const userDb = (0, users_1.getUserSync)();
        data = userDb.find((users) => users.id === id);
        if (title || archive) {
            data = data === null || data === void 0 ? void 0 : data.errands.filter((tsk) => {
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
            return response.json(data === null || data === void 0 ? void 0 : data.errands);
        }
        else {
            return response.json(data);
        }
    }
}
exports.FilterListController = FilterListController;
