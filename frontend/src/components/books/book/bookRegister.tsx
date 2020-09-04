import React, { useState, useEffect, useContext } from "react";

import "./book.css";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import {
    Badge,
    CircularProgress,
    Paper,
    Button,
    Fab,
    Grid,
} from "@material-ui/core";

// Material-UIアイコン取得
import MailIcon from "@material-ui/icons/Mail";
import ShareIcon from "@material-ui/icons/Share";
import ListAlt from "@material-ui/icons/ListAlt";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Lock from "@material-ui/icons/Lock";
import Chat from "@material-ui/icons/Chat";
import Assessment from "@material-ui/icons/Assessment";
import CloudUpload from "@material-ui/icons/CloudUpload";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Card from "../../../shared/components/UIElements/Card";
import Input from "../../../shared/components/FormElements/Input";
import ButtonE from "../../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import BookSearch from "./bookSearch";

function HTTPClient() {
    return useHttpClient();
}

function Context() {
    console.log("useContext(AuthContext):" + useContext(AuthContext).userId);
    return useContext(AuthContext);
}

// function LoadState(): any {
//     const [loadedBookinfo, setLoadedBookinfo] = useState();
//     return [loadedBookinfo, setLoadedBookinfo];
// }

function BookForm() {
    return useForm(
        {
            id: {
                value: "",
                isValid: false,
            },
            name: {
                value: "",
                isValid: false,
            },
            author: {
                value: "",
                isValid: false,
            },
        },
        false
    );
}

// スタイルを適用する
function Styles() {
    const styles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
                padding: "10px",
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: "center",
                "& > *": {
                    margin: theme.spacing(3),
                },
            },
        })
    );

    return styles;
}

const bookRegister = (props: any) => {
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const auth = Context();
    console.log("userId:" + auth.isLoggedIn);
    // const [loadedBookinfo, setLoadedBookinfo] = LoadState();

    const classes:any = Styles();

    const [formState, inputHandler, setFormData] = BookForm();

    const bookSubmitHandler = async (event: any) => {
        event.preventDefault();

        try {
            const responseData = await sendRequest(
                "http://localhost:5000/books/register",
                "POST",
                JSON.stringify({
                    bookId: formState.inputs.id.value,
                    name: formState.inputs.name.value,
                    author: formState.inputs.author.value,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
        } catch (err) {}
    };

    // これをsearchedBookに移動する
    // const searchBookSubmitHandler = async (
    //     id: any,
    //     image: any,
    //     name: any,
    //     author: any,
    //     publishedDate: any,
    //     description: any
    // ) => {
    //     try {
    //         const responseData = await sendRequest(
    //             "http://localhost:5000/books/register",
    //             "POST",
    //             JSON.stringify({
    //                 userId: auth.userId,
    //                 bookId: id,
    //                 name: name,
    //                 author: author,
    //                 image:image,
    //                 publishedDate:publishedDate,
    //                 description:description
    //             }),
    //             {
    //                 "Content-Type": "application/json",
    //             }
    //         );
    //     } catch (err) { }
    // };

    return (
        <React.Fragment>
            <Card className="book">
                <form onSubmit={bookSubmitHandler}>
                    <Input
                        element="input"
                        id="id"
                        type="text"
                        label="本：id"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="idを入力してください。"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="本：name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="本の名前を入力してください。"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="author"
                        type="text"
                        label="本：author"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="作者名を入力してください。"
                        onInput={inputHandler}
                    />
                    <ButtonE type="submit" disabled={!formState.isValid}>
                        登録
                    </ButtonE>
                </form>
            </Card>
            <BookSearch auth={auth} />

            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12} justify="center">
                    <Paper
                        variant="outlined"
                        elevation={3}
                        className={classes.paper}
                    >
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        <Fab color="secondary" aria-label="edit">
                            <EditIcon />
                        </Fab>
                        <Fab disabled aria-label="like">
                            <FavoriteIcon />
                        </Fab>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default bookRegister;
