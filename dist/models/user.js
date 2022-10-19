"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
class User {
    constructor(name, email, password, errand) {
        this._id = crypto_1.default.randomUUID();
        this._name = name;
        this._email = email;
        this._password = password;
        this._errands = errand !== null && errand !== void 0 ? errand : [];
    }
    get id() {
        return this._id;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get errands() {
        return this._errands;
    }
    static create(id, name, email, password, errand) {
        const user = new User(name, email, password);
        user._id = id;
        user._name = name;
        user._email = email;
        user._password = password;
        user._errands = errand;
        return user;
    }
    toJson() {
        return {
            id: this._id,
            name: this._name,
            email: this._email,
            errand: this._errands,
        };
    }
    createErrand(title, message, archive) {
        if (!["true", "false"].some((test) => test === archive)) {
            throw new Error("Archive invalid, please use: true or false");
        }
        this._errands.push({
            idErrand: crypto_1.default.randomUUID(),
            title: title,
            message: message,
            archive: archive,
        });
    }
    updateErrand(idErrand, title, message, archive) {
        const index = this._errands.findIndex((item) => item.idErrand === idErrand);
        this._errands[index] = {
            idErrand: idErrand,
            title: title,
            message: message,
            archive: archive,
        };
    }
    deleteErrand(idErrand) {
        const indexSplice = this._errands.findIndex((item) => item.idErrand === idErrand);
        this._errands.splice(indexSplice, 1);
    }
}
exports.User = User;
