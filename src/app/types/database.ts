export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          assigned_to: string
          created_by: string
          deadline: string | null
          priority: 'LOW' | 'MEDIUM' | 'HIGH'
          status: 'TODO' | 'IN_PROGRESS' | 'DONE'
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description?: string | null
          assigned_to: string
          created_by: string
          deadline?: string | null
          priority?: 'LOW' | 'MEDIUM' | 'HIGH'
          status?: 'TODO' | 'IN_PROGRESS' | 'DONE'
          tags?: string[]
        }
        Update: {
          title?: string
          description?: string | null
          assigned_to?: string
          deadline?: string | null
          priority?: 'LOW' | 'MEDIUM' | 'HIGH'
          status?: 'TODO' | 'IN_PROGRESS' | 'DONE'
          tags?: string[]
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
        }
        // ... Insert and Update types
      }
    }
    // ... Other schema definitions
  }
}