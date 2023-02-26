export const Select = ({ name, value, id, labelText, ...props }) => {
  return (
    <>
      <div className="field">
        <label htmlFor={id} className="field__label">
          {labelText}
        </label>
        <select
          id={id}
          name={name}
          className="field__input"
          value={value}
          {...props}>
          <option value="men's clothing">men&apos;s clothing</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="women's clothing">women&apos;s clothing</option>
        </select>
      </div>
    </>
  );
};

export default Select;
