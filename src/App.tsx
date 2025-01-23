import { useState } from 'react';
import { Check, Trash2, Plus, ListTodo } from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-8">
            <ListTodo className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">ThunderTasks ⚡</h1>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addTodo}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add
            </button>
          </div>

          <div className="mb-4 flex gap-2">
            {(['all', 'active', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md ${
                  filter === f 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <button
                  onClick={() => setTodos(todos.map(t =>
                    t.id === todo.id ? {...t, completed: !t.completed} : t
                  ))}
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                    todo.completed 
                      ? 'border-purple-600 bg-purple-600' 
                      : 'border-gray-300'
                  }`}
                >
                  {todo.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <span className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
                  className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>✨ Done with ❤️ by ThunderLight ⚡</p>
        </footer>
      </div>
    </div>
  );
}
