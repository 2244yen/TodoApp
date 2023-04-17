import { useContext, useEffect, useRef, useState } from "react";
import { TodoItem } from "./Item";
import './List.css';
import { ListContext } from '../utils/ListContext';
import { getItem } from "../utils/helper";
import { IItem } from "../utils/interface";

export function TodoList(props: {onFilter: any}) {
  const {list, setList} = useContext(ListContext);
  const [status, setStatus] = useState('');
  const [isCleared, setIsCleared] = useState(false);
  const count = useRef(0);

  const getComletedTotal = () => {
    return list.reduce((result: number, item: IItem) => {
      if (item.status === 'completed') result += 1;
      return result;
    }, 0)
  }
  count.current = getComletedTotal();

  const listElm = [...list].map((item, key) => {
    return <TodoItem data={item} key={key} />;
  });

  const onFilter = (data: string[] = []) => {
    props.onFilter(data);
    setStatus(data[0] || '');
    setIsCleared(false);
  }

  const onClear = (event: any) => {
    const list = getItem('data') || [];
    const newList = list.map((item :IItem[]) => ({...item, status: 'active' as any}));
    setList(newList);
    setIsCleared(true);
  }

  useEffect(() => {
    count.current = getComletedTotal();
  });

  return (
    <div>
      <div className="list">
        {listElm}
      </div>
      <div className="summary">
        <div>{count.current} item left</div>
        <div className="buttons">
          <button className={`${!status && !isCleared ? 'is-actived' : ''}`} onClick={() => onFilter([])}>All</button>
          <button className={`${status === 'active' && !isCleared ? 'is-actived' : ''}`} onClick={() => onFilter(['active'])}>Active</button>
          <button className={`${status === 'completed' && !isCleared ? 'is-actived' : ''}`} onClick={() => onFilter(['completed'])}>Completed</button>
        </div>
        <button className={`${isCleared ? 'is-actived' : ''}`} onClick={onClear}>Clear completed</button>
      </div>
    </div>
  )
}
