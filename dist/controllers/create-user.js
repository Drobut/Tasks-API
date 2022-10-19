"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const user_1 = require("../models/user");
const users_1 = require("../db/users");
class CreateUserController {
    create(request, response) {
        const { name, email, password, errand } = request.body;
        const user = new user_1.User(name, email, password, errand);
        const users = (0, users_1.getUserSync)();
        users.push(user);
        (0, users_1.saveUserSync)(users);
        return response.json(user.toJson());
    }
}
exports.CreateUserController = CreateUserController;
