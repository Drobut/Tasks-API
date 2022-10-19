"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateErrandController = void 0;
const users_1 = require("../db/users");
class CreateErrandController {
    creatErrand(request, response) {
        const { id } = request.params;
        const { title, message, archive } = request.body;
        const userDb = (0, users_1.getUserSync)();
        const user = userDb.find((users) => users.id === id);
        try {
            user === null || user === void 0 ? void 0 : user.createErrand(title, message, archive);
            (0, users_1.saveUserSync)(userDb);
        }
        catch (err) {
            return response.status(400).json({ err: err.message });
        }
        return response.json(user);
    }
}
exports.CreateErrandController = CreateErrandController;
