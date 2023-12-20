import React from 'react';
import "./modal.css"

const Modal = ({active, children}) => {
    return (
        <div className={active ? "modal active" : "modal"}>
            <div className='p-3 rounded bg-body-tertiary' onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;