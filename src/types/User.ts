export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  role: "user" | "admin";
}
