import type { TaskFields } from "../types/TaskFields";

const taskList: TaskFields[] = [
  {
    id: crypto.randomUUID(),
    title: "פרוייקט גמר",
    body: "לסיים את משימת מנהל המשימות",
    priority: "high",
    dueDate: "31/5/26",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "לצבוע את הארון",
    body: "לצבוע את הארון בחדר בצע עץ כהה",
    priority: "low",
    dueDate: "19/6/26",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "קניות",
    body: "לקנות חלב, לחם, סוכר וקפה",
    priority: "medium",
    dueDate: "20/5/26",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "טיפול לרכב",
    body: "הוספת מים לווישרים וניפוח אויר בצמיגים",
    priority: "high",
    dueDate: "15/5/26",
    isCompleted: false,
  },
] as const;

export default taskList;
