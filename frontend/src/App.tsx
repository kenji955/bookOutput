import React, { useState, useCallback } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import Auth from "./user/pages/Auth";
import Books from "./components/books/books";
import BookCheck from "./components/books/bookCheck";
import BookRegister from "./components/books/book/bookRegister";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import {useAuth} from './shared/hooks/auth-hook';

const App: React.FC = () => {
    const { token, login, logout, userId } = useAuth();
    console.log('App:'+userId);

    let routes;
    // ログイン時
    if (token) {
        routes = (
            <Switch>
                <Route path="/books/register">
                    <BookRegister />
                </Route>
                <Route path="/books/:bookId">
                    <BookCheck />
                </Route>
                <Route path="/books">
                    <Books />
                </Route>
                <Redirect to="/books" />
            </Switch>
        );
        //未ログイン時
    } else {
        routes = (
            <Switch>
                {/* <Route path="/books/register">
                    <BookRegister />
                </Route> */}
                {/* <Route path="/books/:bookId" component={BookCheck} /> */}
                {/* <Route path="/books">
                    <Books />
                </Route> */}
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
            value={{
              // 仮置き
              isLoggedIn: !!token,
              token: token,
              userId: userId,
              login: login,
              logout: logout
            }}
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
