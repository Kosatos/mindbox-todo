export interface ITask {
  id: string
  content: string
  complete: boolean
}

let viewType: 'all' | 'active' | 'completed'
export { viewType }
