import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { usersTable } from "../drizzle/schema.js";

export const createUser = async ({ name, userName, email, password }) => {
  try {
    const [newUser] = await db
      .insert(usersTable)
      .values({ name, userName, email, password });

    return newUser;
  } catch (err) {
    return null;
  }
};

export const findUserByUserName = async (userName) => {
  try {
    const [data] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userName, userName));
    return data;
  } catch (err) {
    return null;
  }
};
