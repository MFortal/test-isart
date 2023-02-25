export const Input = ({ name, value, type, id, labelText, ...props }) => {
  return (
    <>
      <div className="field">
        <label htmlFor={id} className="field__label">
          {labelText}
        </label>
        <input
          id={id}
          type={type}
          name={name}
          className="field__input"
          value={value}
          {...props}
        />
      </div>
    </>
  );
};

export default Input;
