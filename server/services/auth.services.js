import { and, eq } from "drizzle-orm";
import db from "../config/db.js";
import { sessionTable, usersTable } from "../drizzle/schema.js";

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

export const createNewSession = async ({ userId, userAgent, ip }) => {
  try {
    const [data] = await db
      .insert(sessionTable)
      .values({ userId, userAgent, ip })
      .$returningId();
    return data;
  } catch (err) {
    return null;
  }
};

export const getUserDataUsingSessionId = async (sessionId) => {
  try {
    const [data] = await db
      .select({
        name: usersTable.name,
        userName: usersTable.userName,
        email: usersTable.email,
        sessionId: sessionTable.id,
      })
      .from(usersTable)
      .where(and(eq(sessionTable.id, sessionId), eq(sessionTable.valid, true)))
      .innerJoin(sessionTable, eq(usersTable.id, sessionTable.userId));

    return data;
  } catch (err) {
    return null;
  }
};
