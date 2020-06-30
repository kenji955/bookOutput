import React from 'react';

import './TodoList.css';

// interfaceで型を指定しないとPropsは利用できない。呼び出し先でエラーになる。
// 逆に言えば、きちんと定義されていない場合はコンパイルエラーになる
interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={props.onDeleteTodo.bind(null, todo.id)}>
            DELETE
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
