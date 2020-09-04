import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
  // ページ繊維時に更新される認証情報を取得する
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          トップ画面(変更すべき)
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          {/* authからユーザー情報の取得は可能 */}
          <NavLink to={`/${auth.userId}/places`}>MY PAGE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/books">本一覧</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">ログイン/新規登録</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>ログアウト</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
