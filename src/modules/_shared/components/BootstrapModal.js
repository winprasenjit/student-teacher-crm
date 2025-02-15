import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

export default function BootstrapModal({ config, children, type }) {
  const myModal = useRef();

  useEffect(() => {
    myModal.current = new Modal(document.getElementById('myModal_' + type), {
      keyboard: false,
    });
    return () => {
      myModal.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (config && config.open) {
      myModal.current.show();
    }
    if (config && !config.open) {
      myModal.current && myModal.current.hide();
    }
  }, [config]);

  return (
    <>
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id={`myModal_${type}`}
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content overflow-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
