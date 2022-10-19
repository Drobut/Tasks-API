"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteErrandController = void 0;
const users_1 = require("../db/users");
class DeleteErrandController {
    DeleteErrand(request, response) {
        const { id, idErrand } = request.params;
        const userDb = (0, users_1.getUserSync)();
        const user = userDb.find((users) => users.id === id);
        const errand = userDb.find((ids) => ids.errands.find((task) => task.idErrand === idErrand));
        if (!errand) {
            return response.status(404).json({ error: "task not found" });
        }
        try {
            user === null || user === void 0 ? void 0 : user.deleteErrand(idErrand);
            (0, users_1.saveUserSync)(userDb);
        }
        catch (err) {
            return response.status(400).json({ err: err.message });
        }
        return response.json(user);
    }
}
exports.DeleteErrandController = DeleteErrandController;
