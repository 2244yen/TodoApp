import { useContext, useEffect, useState } from 'react'
import './App.css'
import { TodoList } from './components/List';
import { IItem } from './utils/interface';
import { ListContext } from './utils/ListContext';

function App() {
  const [list, setList] = useState<IItem[]>([]);
  const [statusList, setStatusList] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    try {
      fetch('./data/index.json').then(async (value) => {
        let list = await value.json();
        const isCleared = window.localStorage.getItem('isCleared');
        let checkedList = isCleared ? list.map((item: any) => ({...item, status: 'active' as any})) : list;
        if (statusList.length) {
          checkedList = checkedList.filter((item: IItem) => {
            return statusList.includes(item.status);
          });
        }
        setList(checkedList);
      })
    } catch {}
  }, [statusList])

  const onFilter = (params: string[] = []) => {
    setStatusList(params);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (keyword) {
        const data = [...list];
        list.push({ name: keyword, "status": "active" });
        setList(data);
      }
    }
  }

  const value = {list, setList};

  return (
    <ListContext.Provider value={value}>
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
            <TodoList onFilter={onFilter}></TodoList>
          </div>
        </div>
      </div>
    </ListContext.Provider>
    
    
  )
}

export default App
