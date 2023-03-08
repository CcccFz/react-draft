import { Component } from 'react'

type TodoState = {
  todos: {
    id: number
    title: string
    type: number
    isImport: boolean
    created_at: Date
  }[],
  title: string
  type: number
  isImport: boolean
  [name: string]: any
}

export class Todo extends Component<any, TodoState> {
  constructor(props: any) {
    super(props)
    this.state = {
      todos: [],
      title: '',
      type: 1,
      isImport: false
    }
  }

  change = (e: any) => {
    const name = e.target.name;
    const value = 
      e.target.name === 'type' ? parseInt(e.target.value, 10) :
      e.target.name === 'isImport' ? e.target.value !== '' :
      e.target.value;

    this.setState({
      [name]: value
    })
  }

  delete = (id: number) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });
  }

  submit = (e: any) => {
    this.setState((state) => ({
      todos: state.todos.concat({
        id: state.todos.length + 1,
        title: state.title,
        type: state.type,
        isImport: state.isImport,
        created_at: new Date(),
      }),
      title: '',
      type: 0,
      isImport: false,
    }));
    e.preventDefault();
  }

  render() {    
    return (
      <div className='Todo'>
        <div className='Todo-list' style={{marginBottom: '20px'}}>
          <ul>
            {this.state.todos.map((todo) => 
              <li key={todo.id} >
                {todo.id} | {todo.title} | {todo.type} | {String(todo.isImport)} | {todo.created_at.toLocaleString()}
                <button key={todo.id} onClick={() => this.delete(todo.id)} >X</button>
              </li>
            )}
          </ul>
        </div>

        <div className='Todo-edit'>
          <form onSubmit={this.submit}>
            <div>
              <label htmlFor='title'>
                标题: {'\u00A0'}
                <input 
                  type='text'
                  id='title' name='title'
                  value={this.state.title} onChange={this.change}
                />
              </label>
            </div>
            
            <div>
              <label htmlFor='type'>
                类型: {'\u00A0'}
                <select
                  id='type' name='type'
                  value={this.state.type} onChange={this.change}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </label>
            </div>

            <div>
              <label htmlFor='isImport'>
                是否重要: {'\u00A0'}
                <input 
                  type='radio'
                  id='isImport-Y' name='isImport'
                  value='-' onChange={this.change} checked={this.state.isImport}
                />
                <input 
                  type='radio'
                  id='isImport-F' name='isImport'
                  value='' onChange={this.change} checked={!this.state.isImport}
                />
              </label>
            </div>
            

            <div style={{marginTop: '10px'}}>
              <input type="submit" value="提交" />
            </div>
          </form>
        </div>

      </div>
    )
  }
}