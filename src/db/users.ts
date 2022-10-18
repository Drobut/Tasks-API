import { User } from "../models/user";
import fs from "fs";

const filePath = `${__dirname}/db.json`;

export const getUserSync = (): User[] => {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const data = fs.readFileSync(filePath);

  const UsersJson = JSON.parse(data.toString()) as any[];

  return UsersJson.map((user) =>
    User.create(user.id, user.name, user.email, user.password, user.errand)
  );
};

export const saveUserSync = (users: User[]): void => {
  const dataInJSON = JSON.stringify(users.map((user) => user.toJson()));

  fs.writeFileSync(filePath, dataInJSON);
};
