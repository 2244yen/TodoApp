import { useState } from "react";
import { TodoItem } from "./Item";
import './List.css';
// import { ListContext } from '../utils/ListContext';

export function TodoList(props: {data: any, onFilter: any}) {
  const listElm = [...props.data].map((item, key) => {
    return (
      <TodoItem data={item} key={key} />
    )
  });

  const onFilter = (status: string[] = []) => {
    props.onFilter(status);
  }

  const onClear = () => {}

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
