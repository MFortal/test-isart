export const Button = ({ buttonText }) => {
  return (
    <>
      <div className="field">
        <button type="submit" className="field__button">
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default Button;
