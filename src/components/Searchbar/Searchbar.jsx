import React, { useState } from 'react';
import {
  SearchbarStyled,
  SearchButton,
  SearchForm,
  SearchInput,
  SearchSVG,
} from './Searchbar.styled';

export const Searchbar = ({ submitSearch }) => {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    submitSearch(value);
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={onSubmit}>
        <SearchButton type="submit">
          <SearchSVG />
        </SearchButton>

        <SearchInput
          onChange={onChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
      </SearchForm>
    </SearchbarStyled>
  );
};
