import React from 'react';
import {NavLink} from 'react-router-dom';

export default function SideBar() {
  return (
    <>
      <aside className='sidebar-nav-wrapper'>
        <div className='navbar-logo'>
          <a href='index.html'>
            <img src='images/logo/logo.svg' alt='logo'/>
          </a>
        </div>
        <nav className='sidebar-nav'>
          <ul>
            <li className='nav-item nav-item-has-children'>
              <a
                href='#0'
                className='collapsed'
                data-bs-toggle='collapse'
                data-bs-target='#ddmenu_1'
                aria-controls='ddmenu_1'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='icon'>
                    <svg
                      width='22'
                      height='22'
                      viewBox='0 0 22 22'
                    >
                        <path
                          d='M17.4167 4.58333V6.41667H13.75V4.58333H17.4167ZM8.25 4.58333V10.0833H4.58333V4.58333H8.25ZM17.4167 11.9167V17.4167H13.75V11.9167H17.4167ZM8.25 15.5833V17.4167H4.58333V15.5833H8.25ZM19.25 2.75H11.9167V8.25H19.25V2.75ZM10.0833 2.75H2.75V11.9167H10.0833V2.75ZM19.25 10.0833H11.9167V19.25H19.25V10.0833ZM10.0833 13.75H2.75V19.25H10.0833V13.75Z'/>
                    </svg>
                </span>
                <span className='text'>Dashboard</span>
              </a>
              <ul id='ddmenu_1' className='collapse dropdown-nav'>
                <li>
                  <a href='index.html'> eCommerce </a>
                </li>
              </ul>
            </li>

            <li className='nav-item'>
              <a href='invoice.html'>
                <span className='icon'>
                    <svg
                      width='22'
                      height='22'
                      viewBox='0 0 22 22'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                          d='M17.4166 7.33333C18.9383 7.33333 20.1666 8.56167 20.1666 10.0833V15.5833H16.4999V19.25H5.49992V15.5833H1.83325V10.0833C1.83325 8.56167 3.06159 7.33333 4.58325 7.33333H5.49992V2.75H16.4999V7.33333H17.4166ZM7.33325 4.58333V7.33333H14.6666V4.58333H7.33325ZM14.6666 17.4167V13.75H7.33325V17.4167H14.6666ZM16.4999 13.75H18.3333V10.0833C18.3333 9.57917 17.9208 9.16667 17.4166 9.16667H4.58325C4.07909 9.16667 3.66659 9.57917 3.66659 10.0833V13.75H5.49992V11.9167H16.4999V13.75ZM17.4166 10.5417C17.4166 11.0458 17.0041 11.4583 16.4999 11.4583C15.9958 11.4583 15.5833 11.0458 15.5833 10.5417C15.5833 10.0375 15.9958 9.625 16.4999 9.625C17.0041 9.625 17.4166 10.0375 17.4166 10.5417Z'/>
                    </svg>
                </span>
                <span className='text'>Invoice</span>
              </a>
            </li>

            <span className='divider'>
                            <hr/>
                        </span>
            <li className='nav-item'>
              <NavLink to='/subjects'>
                <img className="me-3" src='images/menu/book-svgrepo-com.svg' alt='logo' width="20" height="20"/>
                <span className='text'>Subjects </span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/academics'>
                <img className="me-3" src='images/menu/academic-cap-svgrepo-com.svg' alt='logo' width="20" height="20"/>
                <span className='text'>Academics </span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/teachers'>
                <img className="me-3" src='images/menu/teacher-male-giving-a-lesson-svgrepo-com.svg' alt='logo'
                     width="20" height="20"/>
                <span className='text'>Teachers </span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/students'>
                <img className="me-3" src='images/menu/student-svgrepo-com.svg' alt='logo'
                     width="20" height="20"/>
                <span className='text'>Students </span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/batches'>
                <img className="me-3" src='images/menu/groups-svgrepo-com.svg' alt='logo'
                     width="20" height="20"/>
                <span className='text'>Batches </span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/classroom'>
                <img className="me-3" src='images/menu/classroom-svgrepo-com.svg' alt='logo'
                     width="20" height="20"/>
                <span className='text'>Classroom </span>
              </NavLink>
            </li>

            <span className='divider'>
                <hr/>
            </span>

            <li className='nav-item'>
              <a href='notification.html'>
                                <span className='icon'>
                                    <svg
                                      width='22'
                                      height='22'
                                      viewBox='0 0 22 22'
                                      fill='none'
                                      xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                          d='M9.16667 19.25H12.8333C12.8333 20.2584 12.0083 21.0834 11 21.0834C9.99167 21.0834 9.16667 20.2584 9.16667 19.25ZM19.25 17.4167V18.3334H2.75V17.4167L4.58333 15.5834V10.0834C4.58333 7.24171 6.41667 4.76671 9.16667 3.94171V3.66671C9.16667 2.65837 9.99167 1.83337 11 1.83337C12.0083 1.83337 12.8333 2.65837 12.8333 3.66671V3.94171C15.5833 4.76671 17.4167 7.24171 17.4167 10.0834V15.5834L19.25 17.4167ZM15.5833 10.0834C15.5833 7.51671 13.5667 5.50004 11 5.50004C8.43333 5.50004 6.41667 7.51671 6.41667 10.0834V16.5H15.5833V10.0834Z'/>
                                    </svg>
                                </span>
                <span className='text'>Notifications</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className='promo-box'>
          <h3>Admin</h3>
          <p>Teacher student relationship manager</p>
          <a
            href='https://plainadmin.com/pro'
            rel='nofollow'
            className='main-btn primary-btn btn-hover'
          >
            Follow us
          </a>
        </div>
      </aside>
      <div className='overlay'></div>
    </>
  );
}
