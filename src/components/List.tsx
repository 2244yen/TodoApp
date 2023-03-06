import { useContext } from "react";
import { TodoItem } from "./Item";
import './List.css';
import { ListContext } from '../utils/ListContext';

export function TodoList(props: {onFilter: any}) {
  const { list, setList } = useContext(ListContext);

  const listElm = [...list].map((item, key) => {
    return <TodoItem data={item} key={key} />;
  });

  const onFilter = (status: string[] = []) => {
    props.onFilter(status);
  }

  const onClear = () => {
    const newList = list.map(item => ({...item, status: 'active' as any}));
    setList(newList);
    window.localStorage.setItem('isCleared', 'true');
  }

  return (
    <div>
      <div className="list">
        {listElm}
      </div>
      <div className="summary">
        <div>0 item left</div>
        <div className="buttons">
          <button onClick={() => onFilter([])}>All</button>
          <button onClick={() => onFilter(['active'])}>Active</button>
          <button onClick={() => onFilter(['completed'])}>Completed</button>
        </div>
        <button onClick={() => onClear()}>Clear completed</button>
      </div>
    </div>
  )
}
