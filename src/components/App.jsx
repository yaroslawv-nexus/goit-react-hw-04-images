import { getImages } from 'api';
import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Layout } from './Layout';
import PuffLoader from 'react-spinners/ClipLoader';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [value, setValue] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalURL, setModalURL] = useState('');

  useEffect(() => {
    if (!value) {
      return;
    }
    async function getImagesEffect() {
      setLoader(true);
      setError(false);
      try {
        const images = await getImages(value, page);
        if (images.data.hits.length === 0) {
          throw new Error();
        }
        setGallery([...gallery, ...images.data.hits]);
      } catch (error) {
        setError(true);
        toast.error('Oops. Error');
      } finally {
        setLoader(false);
      }
    }

    getImagesEffect();
  }, [value, page]);

  const goSearch = searchWord => {
    if (searchWord === '') {
      return;
    }
    setValue(searchWord);
    setPage(1);
    setGallery([]);
  };

  const onNextPage = () => {
    setPage(prev => prev + 1);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickItem = url => {
    openModal();
    setModalURL(url);
  };

  return (
    <Layout>
      <Searchbar submitSearch={goSearch} />
      {gallery.length > 0 && (
        <ImageGallery
          gallery={gallery}
          onClickItem={onClickItem}
          description={value}
        />
      )}
      {gallery.length > 0 && !loader && <Button onClick={onNextPage} />}
      {loader && !error && <PuffLoader />}
      {modalOpen && (
        <Modal
          largeImageURL={modalURL}
          onCloseModal={closeModal}
          description={value}
        />
      )}
      <Toaster position="top-right" />
    </Layout>
  );
};
