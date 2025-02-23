import React from 'react';

export default function HeaderLeft() {
    return (
        <div className='header-left d-flex align-items-center'>
            <div className='menu-toggle-btn mr-20'>
                <button
                    id='menu-toggle'
                    className='main-btn primary-btn btn-hover'
                >
                    <i className='lni lni-chevron-left me-2'></i> Menu
                </button>
            </div>
            <div className='header-search d-none d-md-flex'>
                <form action='#'>
                    <input type='text' placeholder='Search...' />
                    <button>
                        <i className='lni lni-search-alt'></i>
                    </button>
                </form>
            </div>
        </div>
    );
}
