import React, { useState, useCallback } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

import Auth from './user/pages/Auth';
import Books from './components/books/books';

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from './shared/context/auth-context';


const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const todoAddHandler = (text: string) => {
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: Math.random().toString(), text: text },
        ]);
    };

    const todoDeleteHandler = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== todoId);
        });
    };

    //Hooksの一つ。クラスコンポーネントではなく関数コンポーネントでstateを使うためのもの
    //useStateは[state、引数でstateを更新する関数] = useState(関数の初期値)で宣言される
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //useCallbackは関数の処理結果をキャッシュに格納する。再計算の手間を省き処理を軽くすることができる。
    //一つ目の引数は処理結果を保管したい関数、二つ目は依存関係にしたい変数を格納した配列。配列に保管された変数の値が変更されると、一つ目の引数の関数が実行され、キャッシュに新しい処理結果を格納しなおす。空の場合は依存関係なし
    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    let routes;
    // ログイン時
      if (isLoggedIn) {
        routes = (
          <Switch>
            {/* <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/:userId/places" exact>
              <UserPlaces />
            </Route>
            <Route path="/places/new" exact>
              <NewPlace />
            </Route>
            <Route path="/places/:placeId">
              <UpdatePlace />
            </Route> */}
            <Route path="/books">
              <Books />
            </Route>
            <Redirect to="/" />
          </Switch>
        );
        //未ログイン時
      } else {
        routes = (
          <Switch>
            {/* <Route path="/" exact>
              <Users />
            </Route>
            <Route path="/:userId/places" exact>
              <UserPlaces />
            </Route> */}
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Redirect to="/auth" />
          </Switch>
        );
      }
     

    return (
        // <React.Fragment>
        //     <div style={{ display: "inline-block" }}>
        //         <Router>
        //             <MainNavigation />
        //         </Router>
        //     </div>
        //     <div className="App">
        //         <NewTodo onAddTodo={todoAddHandler} />
        //         <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
        //     </div>
        // </React.Fragment>


        <AuthContext.Provider
            value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
        >
            <Router>
                {/* ナビゲーションバーを表示 */}
                <MainNavigation />
                <main>{routes}</main>
                {/* <Auth /> */}
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
