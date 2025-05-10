export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export enum Status {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
  }
  
  export interface User {
    id: string
    name: string
    avatar: string
    email?: string
    role?: string
  }
  
  export interface Task {
    id: string
    title: string
    description: string
    assignee: User
    deadline: string
    priority: Priority
    status: Status
    tags: string[]
    createdAt: Date
  }
  
// src/types.ts
export interface Task {
  id: string
  title: string
  description: string
  assignee: User // This must always be defined
  deadline: string
  priority: Priority
  status: Status
  tags: string[]
  createdAt: Date
}

// If you need to make some fields optional in your form:
export interface TaskFormValues {
  id?: string
  title: string
  description?: string
  assigneeId: string // Just store the ID in the form
  deadline?: string
  priority: Priority
  status: Status
  tags?: string[]
}