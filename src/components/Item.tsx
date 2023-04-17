import { useState, useContext, useEffect } from 'react';
import { ListContext } from '../utils/ListContext';
import './Item.css';

export function TodoItem(props: any) {
  const defaultValue = props.data.status === 'completed';
  let [checked, setChecked] = useState(defaultValue);
  let {list, setList} = useContext(ListContext);

  useEffect(() => {
    setChecked(defaultValue);
  }, [defaultValue])

  const onChangeFn = (event: any) => {
    setChecked(event.target.checked);
    const itemIndex = list.findIndex(item => item.name === props.data.name)
    if (itemIndex !== -1) {
      let data = [...list];
      data[itemIndex].status = event.target.checked === true ? 'completed' : 'active';
      setList(data);
    }
  };

  const onRemoveFn = () => {
    const itemIndex = list.findIndex(item => item.name === props.data.name)
    if (itemIndex !== -1) {
      let data = [...list];
      data.splice(itemIndex, 1);
      setList(data);
    }
  };

  return (
    <div className={`listItem flex`}>
      <div className={`flex ${checked ? 'completed' : null}`}>
        <input
          type="checkbox"
          value={props.data.status}
          checked={checked}
          onChange={onChangeFn}
        ></input>
        <h3>{props.data.name}</h3>
      </div>
      <span className="remove-icon" onClick={onRemoveFn}>
        X
      </span>
    </div>
  )
}
