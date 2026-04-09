import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  satisfiesCustomValidation?: boolean;
  customValidationErrorMessage?: string;
  onError?: () => void;
  onErrorClear?: () => void;
  onTouch?: () => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  satisfiesCustomValidation = true,
  customValidationErrorMessage = '',
  onError = () => {},
  onErrorClear = () => {},
  onTouch = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [touchSignaled, setTouchSignaled] = useState(false);

  const hasError = touched && required && !value;
  const hasCustomValidationError = touched && !satisfiesCustomValidation;
  const [errorSignaled, setErrorSignaled] = useState(false);

  if (touched && !touchSignaled) {
    onTouch();
    setTouchSignaled(true);
  }

  if ((hasError || hasCustomValidationError) && !errorSignaled) {
    onError();
    setErrorSignaled(true);
  }

  if (!hasError && !hasCustomValidationError && errorSignaled) {
    onErrorClear();
    setErrorSignaled(false);
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || hasCustomValidationError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {!hasError && hasCustomValidationError && (
        <p className="help is-danger">{customValidationErrorMessage}</p>
      )}
    </div>
  );
};
