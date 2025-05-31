import {useDispatch} from 'react-redux';

export const Header = () => {

    const onLogout = () => {
    };

    return (
        <header>
            <button onClick={onLogout}>Выход</button>
        </header>
    )
};