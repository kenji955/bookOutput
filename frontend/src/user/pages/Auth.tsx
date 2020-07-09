import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

type auth = {
    isLoggedIn: boolean;
    userId: any;
    token: any;
    login: (uid: any, token: any, expirationDate: any) => void;
    logout: () => void;
};

const Auth: any = () => {
    const auth: auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const switchModeHandler: () => void = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    email: undefined,
                },
                formState.inputs.name.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    email: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    // const authSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     console.log(formState.inputs);
    //     auth.login();
    // };

    const authSubmitHandler = async (event: any) => {
        event.preventDefault();
        if (isLoginMode) {
            try {
                console.log(isLoginMode);
                const responseData = await sendRequest(
                    "http://localhost:5000/users/login",
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );
                console.log("responseData:" + responseData.id);
                auth.login(responseData.id, responseData.token, null);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                // const formData = new FormData();
                // formData.append('email', formState.inputs.email.value);
                // formData.append("name", formState.inputs.name.value);
                // formData.append("password", formState.inputs.password.value);
                const responseData = await sendRequest(
                    "http://localhost:5000/users/signup",
                    "POST",
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        password: formState.inputs.password.value,
                        email: formState.inputs.email.value,
                    }),
                    {
                        "Content-Type": "application/json",
                    }
                );

                auth.login(responseData.userId, responseData.token, null);
            } catch (err) {}
        }
    };

    return (
        <Card className="authentication">
            <h2>ログイン</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="メールアドレス"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="有効なメールアドレスを入力してください。"
                        onInput={inputHandler}
                    />
                )}
                <Input
                    element="input"
                    id="name"
                    type="text"
                    label="アカウント名"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="アカウント名を入力してください。"
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="パスワード"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="有効なパスワードを5文字以上で入力してください。"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? "ログイン" : "新規登録"}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                {isLoginMode ? "新規登録はこちら" : "ログインはこちら"}
            </Button>
        </Card>
    );
};

export default Auth;
