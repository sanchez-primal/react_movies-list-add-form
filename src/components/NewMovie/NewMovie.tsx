import React, { useState } from 'react';
import { TextField } from '../TextField';
import {
  Movie,
  RequiredFields,
  RequiredFieldsTouchedState,
} from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const EMPTY_MOVIE_DATA = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const REQUIRED_FIELDS_TOUCHED_STATE = {
  title: false,
  imgUrl: false,
  imdbUrl: false,
  imdbId: false,
};

const validURLPattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
    '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
    '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieData, setMovieData] = useState<Movie>({ ...EMPTY_MOVIE_DATA });

  const [touchedElements, setTouchedElements] =
    useState<RequiredFieldsTouchedState>({
      ...REQUIRED_FIELDS_TOUCHED_STATE,
    });
  const [untouchedCount, setUntouchedCount] = useState(4);
  const allTouched = untouchedCount === 0;

  const [blockerCount, setBlockerCount] = useState(0);
  const hasError = blockerCount > 0;

  const isSubmitDisabled = hasError || !allTouched;

  function handleChange(fieldName: keyof Movie, input: string) {
    let value = input.trim();

    value = value === '' ? value : input;

    setMovieData(current => ({ ...current, [fieldName]: value }));
  }

  function handleTouch(fieldName: keyof RequiredFields) {
    if (!touchedElements[fieldName]) {
      setTouchedElements(current => ({ ...current, [fieldName]: true }));
      setUntouchedCount(current => current - 1);
    }
  }

  function handleFieldError() {
    setBlockerCount(current => current + 1);
  }

  function handleFieldErrorClear() {
    setBlockerCount(current => current - 1);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    onAdd(movieData);
    setMovieData({ ...EMPTY_MOVIE_DATA });
    setTouchedElements({ ...REQUIRED_FIELDS_TOUCHED_STATE });
    setUntouchedCount(4);
    setCount(current => current + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={input => handleChange('title', input)}
        required
        onError={handleFieldError}
        onErrorClear={handleFieldErrorClear}
        onTouch={() => handleTouch('title')}
      />

      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={input => handleChange('description', input)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={input => handleChange('imgUrl', input)}
        required
        satisfiesCustomValidation={validURLPattern.test(movieData.imgUrl)}
        customValidationErrorMessage="The URL is invalid."
        onError={handleFieldError}
        onErrorClear={handleFieldErrorClear}
        onTouch={() => handleTouch('imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={input => handleChange('imdbUrl', input)}
        required
        satisfiesCustomValidation={validURLPattern.test(movieData.imdbUrl)}
        customValidationErrorMessage="The URL is invalid."
        onError={handleFieldError}
        onErrorClear={handleFieldErrorClear}
        onTouch={() => handleTouch('imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={input => handleChange('imdbId', input)}
        required
        onError={handleFieldError}
        onErrorClear={handleFieldErrorClear}
        onTouch={() => handleTouch('imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
