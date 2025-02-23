import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import actionCreator from '../_shared/helpers/actionCreator';

export default function Signout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actionCreator('DELETE_USER_DETAILS', null));
    sessionStorage.removeItem('user');
    navigate("/login");
  }, []);
}
