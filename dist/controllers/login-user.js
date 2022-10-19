"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginuserController = void 0;
const users_1 = require("../db/users");
class LoginuserController {
    LoginUser(request, response) {
        const { email, password } = request.body;
        const userDb = (0, users_1.getUserSync)();
        const user = userDb.find((users) => users.email === email && users.password === password);
        console.log(user);
        if (!user) {
            console.log(user);
            return response.status(404).json({ error: "user not found" });
        }
        return response.json(user.id);
    }
}
exports.LoginuserController = LoginuserController;
