import React from 'react';

export default function TitleWrapper({title}) {
    return (
        <div className='title-wrapper pt-30'>
            <div className='row align-items-center'>
                <div className='col-md-12'>
                    <div className='title mb-30'>
                        <h2>{title}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
