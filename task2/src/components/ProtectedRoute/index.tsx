import React from 'react';
import {useSelector} from 'react-redux';
import {Outlet, Navigate} from 'react-router-dom';
import {RootState} from '../../store';
import {Role} from '../../types';

export const ProtectedRoute = ({accessRoles}: {accessRoles: Role[]}) => {
    const {  } = useSelector((store: RootState) => store.user);

    return null;
};