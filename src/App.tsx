import { useEffect, useState } from 'react'
import './App.css'
import { TodoList } from './components/List';
import { IItem } from './utils/interface';
import { ListContext } from './utils/ListContext';
import { getItem, setItem } from './utils/helper';

function App() {
  const [list, setListFn] = useState<IItem[]>([]);
  const [keyword, setKeyword] = useState('');

  const fetchList = async () => {
    const value = await fetch('./data/index.json');
    return await value.json();
  }

  const setList = (list: IItem[]) => {
    setListFn(list);
    setItem('data', list);
  }

  useEffect(() => {
    (async () => {
      try {
        const localList = getItem('data');
        const list = localList?.length ? localList : await fetchList();
        setList(list);
      } catch {}
      console.log('_________list')
    })();
  }, [])

  const onFilter = (params: string[] = []) => {
    let clonedList = [...(getItem('data') || [])];
    if (params.length)
      clonedList = clonedList.filter((item: IItem) => params.includes(item.status));
    setListFn(clonedList);
    console.log(clonedList)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && keyword) {
      list.push({ name: keyword, status: "active" });
      setList(list);
      setKeyword('');
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
            value={keyword}
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
