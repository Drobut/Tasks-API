import crypto from "crypto";
import { tasks } from "./errand";

export class User {
  private _id: string;

  get id(): string {
    return this._id;
  }

  private _name: string;
  get email(): string {
    return this._email;
  }
  private _email: string;

  get password(): string {
    return this._password;
  }
  private _password: string;

  get errands(): tasks {
    return this._errands;
  }
  private _errands: tasks;

  constructor(name: string, email: string, password: string, errand?: any) {
    this._id = crypto.randomUUID();
    this._name = name;
    this._email = email;
    this._password = password;
    this._errands = errand ?? [];
  }

  static create(
    id: string,
    name: string,
    email: string,
    password: string,
    errand: tasks
  ): User {
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
      password: this._password,
    };
  }

  toJsonId() {
    return {
      id: this._id,
      name: this._name,
    };
  }

  createErrand(title: string, message: string, archive: string) {
    if (!["true", "false"].some((test) => test === archive)) {
      throw new Error("Archive invalid, please use: true or false");
    }

    this._errands.push({
      idErrand: crypto.randomUUID(),
      title: title,
      message: message,
      archive: archive,
    });
  }

  updateErrand(
    idErrand: string,
    title: string,
    message: string,
    archive: string
  ) {
    const index = this._errands.findIndex((item) => item.idErrand === idErrand);

    this._errands[index] = {
      idErrand: idErrand,
      title: title,
      message: message,
      archive: archive,
    };
  }

  deleteErrand(idErrand: string) {
    const indexSplice = this._errands.findIndex(
      (item) => item.idErrand === idErrand
    );
    this._errands.splice(indexSplice, 1);
  }
}
