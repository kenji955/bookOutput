import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';

import HttpError from "../models/http-error";
import User from "../models/user";


export const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('無効な入力が通過しましたので、データを確認してください。', 422)
      );
    }
  
    const { name, password } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findOne({ name: name });
    } catch (err) {
      const error = new HttpError(
        'サインアップに失敗しました。もう一度お試しください。',
        500
      );
      return next(error);
    }
  
    if (existingUser) {
      const error = new HttpError(
        '入力されたIDはすでに利用されております。',
        422
      );
      return next(error);
    }
  
    // let hashedPassword;
    // try {
    //   hashedPassword = await bcrypt.hash(password, 12);
    // } catch (err) {
    //   const error = new HttpError(
    //     'ユーザーを作成できませんでした。後でもう一度お試しください。',
    //     500
    //   );
    //   return next(error);
    // }
  
    const createdUser = new User({
      name,
      password
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        'サインアップに失敗しました。もう一度お試しください。',
        500
      );
      return next(error);
    }
  
    // let token;
    // try {
    //   token = jwt.sign(
    //     { userId: createdUser.id, email: createdUser.email },
    //     'supersecret_dont_share',
    //     { expiresIn: '1h' }
    //   );
    // } catch (err) {
    //   const error = new HttpError(
    //     'Signing up failed, please try again later.',
    //     500
    //   );
    //   return next(error);
    // }
  
    res
      .status(201)
      .json({ userId: createdUser.id });
  };

export const login = async (req, res, next) => {
    const { name, password } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await User.findOne({ name: name });
      console.log(password,existingUser.name,existingUser.password);
    } catch (err) {
      const error = new HttpError(
        'ログインに失敗しました、後でもう一度お試しください。',
        500
      );
      return next(error);
    }
  
    if (!existingUser) {
      const error = new HttpError(
        '無効なアカウント情報です。ログインできませんでした。',
        403
      );
      return next(error);
    }
  
    let isValidPassword = false;
    try {
    //   isValidPassword = await bcrypt.compare(password, existingUser.password);
      isValidPassword = await password == existingUser.password;
      console.log(isValidPassword);
    } catch (err) {
      const error = new HttpError(
        'ログインできませんでした。認証情報をご確認の上、再度お試しください。',
        500
      );
      return next(error);
    }
  
    if (!isValidPassword) {
      const error = new HttpError(
        '無効なアカウント情報です。ログインできませんでした。',
        403
      );
      return next(error);
    }
  
    // let token;
    // try {
    //   token = jwt.sign(
    //     { userId: existingUser.id, email: existingUser.email },
    //     'supersecret_dont_share',
    //     { expiresIn: '1h' }
    //   );
    // } catch (err) {
    //   const error = new HttpError(
    //     'Logging in failed, please try again later.',
    //     500
    //   );
    //   return next(error);
    // }
  
    res.json({
      name: existingUser.name,
      password: existingUser.password
    //   token: token
    });
  };