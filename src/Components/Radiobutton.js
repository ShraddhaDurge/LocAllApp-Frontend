import { React } from 'react';
import classNames from 'classnames';

const RadioButton = ({
  field: { name, value, onChange},
  id,
  label,
  className,
  ...props

}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        className={classNames('radio-button')}
        {...props}
      />
      <label htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton