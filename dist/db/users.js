"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserSync = exports.getUserSync = void 0;
const user_1 = require("../models/user");
const fs_1 = __importDefault(require("fs"));
const filePath = `${__dirname}/db.json`;
const getUserSync = () => {
    if (!fs_1.default.existsSync(filePath)) {
        return [];
    }
    const data = fs_1.default.readFileSync(filePath);
    const UsersJson = JSON.parse(data.toString());
    return UsersJson.map((user) => user_1.User.create(user.id, user.name, user.email, user.password, user.errand));
};
exports.getUserSync = getUserSync;
const saveUserSync = (users) => {
    const dataInJSON = JSON.stringify(users.map((user) => user.toJson()));
    fs_1.default.writeFileSync(filePath, dataInJSON);
};
exports.saveUserSync = saveUserSync;
