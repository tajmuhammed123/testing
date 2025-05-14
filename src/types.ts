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

export interface TaskFormValues {
  id?: string
  title: string
  description?: string
  assigneeId: string 
  deadline?: string
  priority: Priority
  status: Status
  tags?: string[]
}