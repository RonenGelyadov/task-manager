import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/User";
import { addUser } from "../services/usersFirebaseService";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  /*onAuthStateChanged,*/
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface UserSignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UserContextType {
  user: User | null;
  signUp: (userData: UserSignUpData) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user /*, setUser*/] = useState<User | null>(null);

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
  }: UserSignUpData): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        const newUser: User = {
          id: userCredential.user.uid,
          email,
          firstName,
          lastName,
          role: "user",
        };

        await addUser(newUser);
        return true;
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    /*const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = await getUserById(currentUser.uid);
        if (userData) {
          setUser(userData);
        } else {
          setUser(currentUser as any);
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;*/
  }, []);

  return (
    <UserContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider");

  return context;
};
