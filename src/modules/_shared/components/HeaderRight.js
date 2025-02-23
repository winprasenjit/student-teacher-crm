import React from 'react';
import { Link } from 'react-router-dom'

export default function HeaderRight() {
  return (
    <div className='header-right'>
      <div className='notification-box ml-15 d-none d-md-flex'>
        <button
          className='dropdown-toggle'
          type='button'
          id='notification'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <i className='lni lni-alarm'></i>
          <span>2</span>
        </button>
        <ul
          className='dropdown-menu dropdown-menu-end'
          aria-labelledby='notification'
        >
          <li>
            <a href='#0'>
              <div className='image'>
                <img src='images/lead/lead-6.png' alt='' />
              </div>
              <div className='content'>
                <h6>
                  John Doe
                  <span className='text-regular'>
                    comment on a product.
                  </span>
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consect etur
                  adipiscing elit Vivamus tortor.
                </p>
                <span>10 mins ago</span>
              </div>
            </a>
          </li>
          <li>
            <a href='#0'>
              <div className='image'>
                <img src='images/lead/lead-1.png' alt='' />
              </div>
              <div className='content'>
                <h6>
                  Jonathon
                  <span className='text-regular'>
                    like on a product.
                  </span>
                </h6>
                <p>
                  Lorem ipsum dolor sit amet, consect etur
                  adipiscing elit Vivamus tortor.
                </p>
                <span>10 mins ago</span>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className='header-message-box ml-15 d-none d-md-flex'>
        <button
          className='dropdown-toggle'
          type='button'
          id='message'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <i className='lni lni-envelope'></i>
          <span>3</span>
        </button>
        <ul
          className='dropdown-menu dropdown-menu-end'
          aria-labelledby='message'
        >
          <li>
            <a href='#0'>
              <div className='image'>
                <img src='images/lead/lead-5.png' alt='' />
              </div>
              <div className='content'>
                <h6>Jacob Jones</h6>
                <p>Hey!I can across your profile and ...</p>
                <span>10 mins ago</span>
              </div>
            </a>
          </li>
          <li>
            <a href='#0'>
              <div className='image'>
                <img src='images/lead/lead-3.png' alt='' />
              </div>
              <div className='content'>
                <h6>John Doe</h6>
                <p>Would you mind please checking out</p>
                <span>12 mins ago</span>
              </div>
            </a>
          </li>
          <li>
            <a href='#0'>
              <div className='image'>
                <img src='images/lead/lead-2.png' alt='' />
              </div>
              <div className='content'>
                <h6>Anee Lee</h6>
                <p>Hey! are you available for freelance?</p>
                <span>1h ago</span>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className='filter-box ml-15 d-none d-md-flex'>
        <button className='' type='button' id='filter'>
          <i className='lni lni-funnel'></i>
        </button>
      </div>
      {/* <!-- filter end -->
                <!-- profile start --> */}
      <div className='profile-box ml-15'>
        <button
          className='dropdown-toggle bg-transparent border-0'
          type='button'
          id='profile'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <div className='profile-info'>
            <div className='info'>
              <h6>John Doe</h6>
              <div className='image'>
                <img
                  src='images/profile/profile-image.png'
                  alt=''
                />
                <span className='status'></span>
              </div>
            </div>
          </div>
          <i className='lni lni-chevron-down'></i>
        </button>
        <ul
          className='dropdown-menu dropdown-menu-end'
          aria-labelledby='profile'
        >
          <li>
            <a href='#0'>
              <i className='lni lni-user'></i> View Profile
            </a>
          </li>
          <li>
            <a href='#0'>
              <i className='lni lni-alarm'></i> Notifications
            </a>
          </li>
          <li>
            <a href='#0'>
              {' '}
              <i className='lni lni-inbox'></i> Messages{' '}
            </a>
          </li>
          <li>
            <a href='#0'>
              {' '}
              <i className='lni lni-cog'></i> Settings{' '}
            </a>
          </li>
          <li>
            <Link to={"./signout"}>
              {' '}
              <i className='lni lni-exit'></i>
              Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
