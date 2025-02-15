// import logo from './logo.svg';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './modules/authentication/Login';
import Registration from './modules/authentication/Registration';
import Home from './modules/dashboard/Home';
import GuardedRoute from "./modules/_shared/guards/GuardedRoute";
import Header from './modules/_shared/components/Header';
import Subjects from './modules/subject/Subjects';
import Loader from './modules/_shared/components/Loader';
import Signout from './modules/authentication/Signout';
import Teachers from './modules/teacher/Teachers';
import Students from "./modules/student/Students";
import ClassRoom from "./modules/classroom/ClassRoom";
import Batches from "./modules/batch/Batches";
import Academics from "./modules/academic/Academics";
import Routine from "./modules/classroom/Routine";
import ViewTeacher from "./modules/teacher/ViewTeacher";

function App() {
  const { loader } = useSelector((state) => state.applicationStateReducer);

  const guardedRoute = (component) => {
    return <GuardedRoute>{component}</GuardedRoute>;
  };

  return (
    <div className='App'>
      <div className='outlet-section'>
        <Routes>
          <Route path='/' element={guardedRoute(<Header />)}>
            <Route index element={<Home />} />
            <Route path='/subjects' element={<Subjects />} />
            <Route path='/academics' element={<Academics />} />
            <Route path='/teachers' element={<Teachers />} />
            <Route path='/view-teacher' element={<ViewTeacher />} />
            <Route path='/students' element={<Students />} />
            <Route path='/batches' element={<Batches />} />
            <Route path='/routine' element={<Routine />} />
            <Route path='/classroom' element={<ClassRoom />} />
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
