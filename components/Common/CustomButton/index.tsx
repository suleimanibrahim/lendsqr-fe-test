import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  forwardRef,
} from "react";
import style from "./style.module.css";
import RightArrowIcon from "./RightArrowIcon";
import SpinnerIcon from "./SpinnerIcon";

type CustomButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  loading?: boolean;
  loadingText?: string;
  withIcon?: boolean;
  icon?: ReactNode;
  loadingIconOnly?: boolean;
  iconLeft?: boolean;
  size?: "large" | "medium" | "small";
  text?: string;
  plain?: boolean;
};

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  function _CustomButton(props, ref) {
    const {
      className = "",
      loadingText = "Loading...",
      children,
      loading,
      withIcon,
      icon: Icon,
      iconLeft,
      size,
      text = "Button",
      plain,
      loadingIconOnly,
      ...rest
    } = props;

    return (
      <button
        {...rest}
        ref={ref}
        data-loading={loading}
        className={`${
          plain
            ? "plainBtn"
            : `ButtonCon ${style.CustomButton} ${size}`
        } ${className} `}
      >
        {withIcon && iconLeft && Icon ? Icon : null}{" "}
        {loading ? (loadingIconOnly ? null : loadingText) : children || text}
        {withIcon && !iconLeft && !loading ? (
          Icon ? (
            Icon
          ) : (
            <RightArrowIcon />
          )
        ) : null}
        {loading && <SpinnerIcon />}
      </button>
    );
  }
);

export default CustomButton;
