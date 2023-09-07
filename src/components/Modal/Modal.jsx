import React, { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

export const Modal = ({ largeImageURL, description, onCloseModal }) => {
  useEffect(() => {
    const closeModalEsc = e => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', closeModalEsc);
    return () => {
      window.removeEventListener('keydown', closeModalEsc);
    };
  }, [onCloseModal]);

  const closeClickOverlay = e => {
    if (e.target.nodeName !== 'IMG') {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={closeClickOverlay}>
      <ModalStyle>
        <img src={largeImageURL} alt={description} />
      </ModalStyle>
    </Overlay>
  );
};
