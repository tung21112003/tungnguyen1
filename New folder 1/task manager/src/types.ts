import { TaskProgress, TaskStatus } from "./enums"

export interface Task {
  id?: any
  title: string
  priority: "high" | "medium" | "low"
  status?: TaskStatus
  progress?: TaskProgress
}
