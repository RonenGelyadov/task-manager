import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import type { User } from "../types/User";

const usersCollectionName = "users";
const usersCollection = collection(db, usersCollectionName);

export const getUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await getDocs(usersCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

export async function addUser(user: User): Promise<string> {
  try {
    const userDocRef = doc(db, usersCollectionName, user.id);

    await setDoc(userDocRef, user);

    return user.id;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userDocRef = doc(db, usersCollectionName, id);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data() as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};
