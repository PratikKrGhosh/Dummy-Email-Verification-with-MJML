import { and, eq } from "drizzle-orm";
import db from "../config/db.js";
import {
  sessionTable,
  usersTable,
  verifyEmailTable,
} from "../drizzle/schema.js";

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
        isVerified: usersTable.isVerified,
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

export const getSessionDataById = async (id) => {
  const [data] = await db
    .select()
    .from(sessionTable)
    .where(eq(sessionTable.id, id));
  return data;
};

export const deleteSessionDataById = async (id) => {
  const [data] = await db.delete(sessionTable).where(eq(sessionTable.id, id));
  return data;
};

export const getSessionDataByIp = async (ip) => {
  const [data] = await db
    .select()
    .from(sessionTable)
    .where(eq(sessionTable.ip, ip));
  return data;
};

export const deleteSessionDataByIp = async (ip) => {
  const [data] = await db.delete(sessionTable).where(eq(sessionTable.ip, ip));
  return data;
};

export const deleteAndInsertTokenData = async ({ userId, token }) => {
  return db.transaction(async (tx) => {
    try {
      await tx
        .delete(verifyEmailTable)
        .where(eq(verifyEmailTable.userId, userId));

      await tx.insert(verifyEmailTable).values({ userId, token });
    } catch (err) {
      console.log("Couldn't Delete and Insert Verify Email Token Data");
      return null;
    }
  });
};

export const getTokenDataByUserId = async (userId) => {
  try {
    const [data] = await db
      .select()
      .from(verifyEmailTable)
      .where(eq(verifyEmailTable.userId, userId));
    return data;
  } catch (err) {
    return null;
  }
};

export const deleteTokenDataByUserId = async (userId) => {
  try {
    const [data] = await db
      .delete(verifyEmailTable)
      .where(verifyEmailTable.userId, userId);
    return data;
  } catch (err) {
    return null;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const [data] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return data;
  } catch (err) {
    return null;
  }
};

export const updateUserVerifyStatus = async (userId) => {
  return db.transaction(async (tx) => {
    try {
      await tx
        .update(usersTable)
        .set({ isVerified: true })
        .where(eq(usersTable.id, userId));

      await tx
        .delete(verifyEmailTable)
        .where(eq(verifyEmailTable.userId, userId));
    } catch (err) {
      console.log("Could not modify Verify Status of the User");
      return null;
    }
  });
};
