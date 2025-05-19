import PropTypes from "prop-types";

import "./style.scss";

export const BUTTON_TYPES = {
  DEFAULT: 1,
  SUBMIT: 2,
};

const Button = ({ title, onClick, type, disabled, children }) => {
  const buttonType = type === BUTTON_TYPES.SUBMIT ? "submit" : "button";

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={buttonType}
      disabled={disabled}
      className="Button"
      data-testid="button-test-id"
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};


Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.number,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
Button.defaultProps = {
  disabled: false,
  onClick: () => null,
  type: BUTTON_TYPES.DEFAULT,
  title: "",
  children: null
}

export default Button;
