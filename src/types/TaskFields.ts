export interface TaskFields {
  id: string;
  title: string;
  body: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  isCompleted?: boolean;
}
