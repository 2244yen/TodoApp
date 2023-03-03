import { useEffect, useState } from 'react'
import './App.css'
import { TodoList } from './components/List';
import { ListContext } from './utils/ListContext';

interface IItem {
  name: string;
  status: "active" | "completed"
}

function App() {
  const [data, setData] = useState<IItem[]>([]);
  const [statusList, setStatusList] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    try {
      fetch('./data/index.json').then(async (value) => {
        let list = await value.json();
        if (statusList.length)
          list = list.filter((item: IItem) => {
            return statusList.includes(item.status);
          });
        setData(list);
      })
    } catch {}
  }, [statusList])

  const onFilter = (params: string[] = []) => {
    setStatusList(params);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (keyword) {
        const list = [...data];
        list.push({ name: keyword, "status": "active" });
        setData(list);
      }
    }
  }

  return (
    <div className="App">
      <div className="border">
        <h2 className="text-center">To do app</h2>
        <input
          id="searchInput"
          placeholder="What needs to be done?"
          className="search-input"
          onChange={event => setKeyword(event.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <div className="wrapper">
          <TodoList data={data} onFilter={onFilter}></TodoList>
        </div>
      </div>
    </div>
    
  )
}

export default App
