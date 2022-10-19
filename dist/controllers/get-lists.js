"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListController = void 0;
const users_1 = require("../db/users");
class GetListController {
    GetErrand(request, response) {
        const { id } = request.params;
        const userDb = (0, users_1.getUserSync)();
        const user = userDb.find((users) => users.id === id);
        return response.json(user === null || user === void 0 ? void 0 : user.errands);
    }
}
exports.GetListController = GetListController;
