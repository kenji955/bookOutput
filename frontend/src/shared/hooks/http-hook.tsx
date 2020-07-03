import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]:any = useState();

  // useRefは格納された値の最新値を管理する
  const activeHttpRequests:any = useRef([]);

  // useclallbackは関数の結果をキャッシュに保管するHook
  const sendRequest = useCallback(
    // 呼び出し先の引数はurlのみと仮定
    async (url, method = 'GET', body = null, headers = {}) => {
      // DB読み込み中フラグを立てる
      setIsLoading(true);
      // API導入。fetchを中断することができる。fetchはpromiseのためそれを中止という概念がJavascriptにはない。
      const httpAbortCtrl = new AbortController();
      // activeHttpRequestsの現在値にhttpAbortCtrlを設定
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        // fetchでDBバックエンドにurlを送付して、データを取得しようとしている。
        const response = await fetch(url, {
          method,
          body,
          headers,
          // abortCtrl.abort()が呼ばれた時にsignalを発生させるためのフラグ
          signal: httpAbortCtrl.signal
        });

        // 上記処理の終了待ち。結果を格納
        const responseData = await response.json();

        // ？
        // おそらく、最新の処理以外のfetch中断APIを削除している
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl:any) => reqCtrl !== httpAbortCtrl
        );

        // responseが帰ってきたかどうか
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        // DB読み込み終了
        setIsLoading(false);
        
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl:any) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
