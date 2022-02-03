const Button = ({ children, text, type, action, styles, disabled }) => {
  return (
    <button
      className={`${styles} inline-flex px-4 py-2 border-0 rounded-md btn focus:outline-none`}
      onClick={(e) => action(e)}
      disabled={disabled}
      type={type}
    >
      {children || text}
    </button>
  );
};

export default Button;
