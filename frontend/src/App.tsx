import React, { useState, useCallback } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

import Auth from "./user/pages/Auth";
import Books from "./components/books/books";
import BookCheck from "./components/books/bookCheck";
import BookRegister from "./components/books/book/bookRegister";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

// 独自のテーマを作成する
const theme = createMuiTheme({
    palette: {
        //type: 'dark', // ダークテーマ
        primary: green,
        // primary: red,
    },
    typography: {
        fontFamily: ["Noto Sans", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            fontSize: "1.75rem",
        },
        h2: {
            fontSize: "1.5rem",
        },
        h3: {
            fontSize: "1.25rem",
        },
        h4: {
            fontSize: "1.125rem",
        },
        h5: {
            fontSize: "1rem",
        },
        h6: {
            fontSize: "1rem",
        },
    },
});

const App: React.FC = () => {
    const { token, login, logout, userId } = useAuth();
    console.log("App:" + userId);

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

        <MuiThemeProvider theme={theme}>
            <AuthContext.Provider
                value={{
                    // 仮置き
                    isLoggedIn: !!token,
                    token: token,
                    userId: userId,
                    login: login,
                    logout: logout,
                }}
            >
                <Router>
                    {/* ナビゲーションバーを表示 */}
                    <MainNavigation />
                    <main>{routes}</main>
                    {/* <Auth /> */}
                </Router>
            </AuthContext.Provider>
        </MuiThemeProvider>
    );
};

export default App;
