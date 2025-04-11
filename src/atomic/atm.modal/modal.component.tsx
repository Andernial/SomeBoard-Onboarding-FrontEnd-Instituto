import React from 'react';
import { createPortal } from 'react-dom';
import close from '@assets/icons/close.png';

interface modalProps {
 isOpen: boolean;
 onClose: () => void;
 children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: modalProps) {
 const modalPortal = document.getElementById('modal-portal');
 if (!isOpen || !modalPortal) {
  return null;
 }

 return createPortal(
  <>
   <div
    className="fixed flex justify-center items-center inset-[0px] min-h-svh w-full bg-grayScale-xdark bg-opacity-50  z-10"
    onClick={() => onClose()}
   />

   <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-grayScale-white rounded-md flex flex-col items-center min-h-[200px] min-w-[400px] z-20">
    <button className="bg-transparent cursor-pointer self-end mr-sm mt-sm" onClick={() => onClose()}>
     <img src={close} alt="fechar" />
    </button>
    {children}
   </div>
  </>,
  modalPortal,
 );
}
