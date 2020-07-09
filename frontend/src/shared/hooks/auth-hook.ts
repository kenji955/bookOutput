import { useState, useCallback, useEffect } from 'react';

let logoutTimer: any;

// 
export const useAuth = () => {
  //Hooksの一つ。クラスコンポーネントではなく関数コンポーネントでstateを使うためのもの
  //useStateは[state、引数でstateを更新する関数] = useState(関数の初期値)で宣言される
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(new Date);
  const [userId, setUserId] = useState();

  // ログイン処理。
  //useCallbackは関数の処理結果をキャッシュに格納する。再計算の手間を省き処理を軽くすることができる。
  //一つ目の引数は処理結果を保管したい関数、二つ目は依存関係にしたい変数を格納した配列。配列に保管された変数の値が変更されると、一つ目の引数の関数が実行され、キャッシュに新しい処理結果を格納しなおす。空の場合は依存関係なし
  const login = useCallback((uid, token, expirationDate) => {
    // tokenとユーザーIDを設定
    setToken(token);
    setUserId(uid);
    console.log('Login処理時のuid：'+uid);
    console.log('Login処理時のuserId：'+userId);
    // 引数、1時間後のより未来である時間を取得。たぶん。
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    // ブラウザ上のlocalstorageにデータを保管
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        // 「2011-10-05T14:48:00.000Z」という形式で出力する
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  // ログアウト処理
  const logout = useCallback(() => {
    // tokenやログアウトまでの時間、ユーザーIDを空にする
    setToken(null!);
    setTokenExpirationDate(null!);
    setUserId(null!);
    // localStorageに保管した情報を消す
    localStorage.removeItem('userData');
  }, []);

  // token、タイムアウト予定時間が更新 もしくはログアウト処理が行われるごとに実行される。
  useEffect(() => {
    if (token && tokenExpirationDate) {
      // ログイン中でタイムアウト予定時間も入力されている場合、
      // タイムアウトまでの時間数を取得し、時間がたったらログアウトを実行する
      const remainingTime = (tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // ログアウト処理後、タイムアウト予定時間を初期化する。
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // ログイン処理が行われるごとに実行される。
  useEffect(() => {
    // localStorageから情報を取得
    const storedData = JSON.parse(localStorage.getItem('userData')!);
    // 情報あり、ログイン中、タイムアウト予定時間も過ぎていない場合、再度ログイン処理を行い、タイムアウト予定時間を延長する
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
      console.log('useEffectのtoken：'+storedData.token);
      console.log('useEffectのuserId：'+storedData.userId);
    }
  }, [login]);

  console.log('useAuthのreturn直前のtoken：'+token);
  console.log('useAuthのreturn直前のuserId：'+userId);
  return { token, login, logout, userId };
};