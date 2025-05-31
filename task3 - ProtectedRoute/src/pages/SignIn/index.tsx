import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AppDispatch, RootState} from '../../store';
import {loginUserThunk, getUserThunk} from '../../features/user/userSlice';

export const SignIn = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const isLoading = useSelector((state: RootState) => state.user.isLoading);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onChangeLogin = useCallback<React.ReactEventHandler<HTMLInputElement>>((e) => {
        setLogin(e.currentTarget.value);
    }, [setPassword]);
    const onChangePassword = useCallback<React.ReactEventHandler<HTMLInputElement>>((e) => {
        setPassword(e.currentTarget.value);
    }, [setPassword]);

    const onSubmit = useCallback<React.ReactEventHandler<HTMLFormElement>>((e) => {
        e.preventDefault();
        dispatch(loginUserThunk({login, password}))
            .unwrap()
            .then(token => {
                localStorage.setItem('token', token);
                dispatch(getUserThunk({token}))
                    .unwrap()
                    .then(() => {
                        navigate('/');
                    });
            })
    }, [login, password, navigate]);

    return <main className="container small">
        <h1>Вход:</h1>
        <form onSubmit={onSubmit} className="column">
            <label>
                <span>Логин</span>
                <input type="text" onChange={onChangeLogin} value={login} />
            </label>
            <label>
                <span>Пароль</span>
                <input type="password" onChange={onChangePassword} value={password} />
            </label>
            <button disabled={isLoading}>Отправить</button>
        </form>
    </main>
};