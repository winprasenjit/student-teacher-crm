// import logo from './logo.svg';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './modules/authentication/Login';
import Registration from './modules/authentication/Registration';
import Home from './modules/dashboard/Home';
import GuradedRoute from './modules/_shared/guards/GuradedRoute';
import Header from './modules/_shared/components/Header';
import Subjects from './modules/subject/Subjects';
import Loader from './modules/_shared/components/Loader';
import Signout from './modules/authentication/Signout';
import Teachers from './modules/teacher/Teachers';

function App() {
  const { loader } = useSelector((state) => state.applicationStateReducer);

  const gurdedRoute = (component) => {
    return <GuradedRoute>{component}</GuradedRoute>;
  };

  return (
    <div className='App'>
      <div className='outlet-section'>
        <Routes>
          <Route path='/' element={gurdedRoute(<Header />)}>
            <Route index element={<Home />} />
            <Route path='/subjects' element={<Subjects />} />
          </Route>
          <Route path='/' element={gurdedRoute(<Header />)}>
            <Route index element={<Home />} />
            <Route path='/teachers' element={<Teachers />} />
          </Route>
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signout' element={<Signout />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
      {loader && <Loader />}
    </div>
  );
}

export default App;
