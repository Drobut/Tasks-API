"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidateMiddleware = void 0;
const users_1 = require("../db/users");
class UserValidateMiddleware {
    validate(request, response, next) {
        const { id } = request.params;
        const userDb = (0, users_1.getUserSync)();
        const user = userDb.find((users) => users.id === id);
        if (!user) {
            return response.status(404).json({ error: "user not found" });
        }
        return next();
    }
}
exports.UserValidateMiddleware = UserValidateMiddleware;
