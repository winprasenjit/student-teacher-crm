import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';
import { useState } from 'react';

export default function BootstrapModal({ config, children }) {
  const myModal = useRef();
  const [childKey, setChildKey] = useState(1);

  useEffect(() => {
    setChildKey(prev => prev + 1);
    myModal.current = new Modal(document.getElementById('myModal'), {
      keyboard: false,
    });

    if (config && config.open) {
      myModal.current.show();
    }

    return () => {
      myModal.current.dispose();
    };
  }, [config]);

  return (
    <>
      <div
        className='modal fade'
        data-bs-backdrop='static'
        id='myModal'
        aria-hidden='true'
        aria-labelledby='exampleModalToggleLabel'
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content' key={childKey}>{children}</div>
        </div>
      </div>
    </>
  );
}
