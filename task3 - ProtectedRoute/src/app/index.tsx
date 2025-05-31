import {useEffect} from 'react';
import {
	Routes,
	Route,
} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {Home} from '../pages/Home';
import {SignIn} from '../pages/SignIn';
import {getUserThunk, init} from '../features/user/userSlice';
import {AppDispatch} from '../store';
import {ProtectedRoute} from '../components/ProtectedRoute';
import {ROLE} from '../constants';
import {AdminPage} from "../pages/AdminPage";

export const App = () => {
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch(getUserThunk({token}));
		} else {
			dispatch(init());
		}
	}, []);

	return (
		<>
			<Routes>
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/' element={<Home />} />
				<Route path='/admin' element={<AdminPage />} />
			</Routes>
		</>
	)
};