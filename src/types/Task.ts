export interface Task {
  id: string;
  title: string;
  body: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  dueDate: string;
  isCompleted: boolean;
}
