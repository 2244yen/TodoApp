import './Item.css';

export function TodoItem(props: any) {
  const onUpdate = (event: any) => {
  }

  return (
    <div className={`listItem ${props.data.status === 'completed' ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={props.data.status === 'completed'}
        onChange={(event => onUpdate(event))}
      ></input>
      <h3>{props.data.name}</h3>
    </div>
  )
}
