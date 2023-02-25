import React from 'react';

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6 order-last order-md-first'>
                        <div className='copyright text-center text-md-start'>
                            <p className='text-sm'>
                                Designed and Developed by
                                <a
                                    href='https://plainadmin.com'
                                    rel='nofollow'
                                >
                                    PlainAdmin
                                </a>
                            </p>
                        </div>
                    </div>
                    {/* <!-- end col--> */}
                    <div className='col-md-6'>
                        <div
                            className='
                  terms
                  d-flex
                  justify-content-center justify-content-md-end
                '
                        >
                            <a href='#0' className='text-sm'>
                                Term & Conditions
                            </a>
                            <a href='#0' className='text-sm ml-15'>
                                Privacy & Policy
                            </a>
                        </div>
                    </div>
                </div>
                {/* <!-- end row --> */}
            </div>
            {/* <!-- end container --> */}
        </footer>
    );
}
