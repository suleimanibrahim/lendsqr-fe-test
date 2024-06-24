"use client";
import React, { ComponentProps, ReactNode, useEffect, useState } from "react";
import styles from "./FormField.module.scss";
import BootstrapForm from "react-bootstrap/Form";
import { FieldAttributes, ErrorMessage, useField } from "formik";

export type SelectOption = { name: string; value: string } & Partial<Record<string, any>>;
type ComponentName = "input-text" | "password";
type TypeObject = Record<ComponentName, ReactNode>;
type FormLabelProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  style?: ComponentProps<"label">["style"];
  withAsterisk?: boolean;
};
export type PenaidFormFieldOtherProps = {
  labelClassName?: ComponentProps<"label">["className"];
  wrapperClassName?: ComponentProps<"div">["className"];
  label?: string;
  componentName?: ComponentName;
  labelAsterisk?: boolean;
  name: string;
};

type InputFieldProps = FieldAttributes<JSX.IntrinsicElements["input"]> & {
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

type PasswordFieldProps = FieldAttributes<JSX.IntrinsicElements["input"]> & {
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

type LenSqrFormFieldProps = {
  componentName?: ComponentName;
} & FieldAttributes<PenaidFormFieldOtherProps>;

const LenSqrFormField = (props: LenSqrFormFieldProps) => {
  const [hasError, setHasError] = useState(false);
  const { wrapperClassName, labelAsterisk, componentName = "input-text", ...rest } = props;

  const typeObj: TypeObject = {
    "input-text": (
      <InputField
        {...(rest as any)}
        hasError={hasError}
        setHasError={setHasError}
      />
    ),
    "password": (
      <PasswordField
        {...(rest as any)}
        hasError={hasError}
        setHasError={setHasError}
      />
    ),
  };

  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`}>
      {typeObj[componentName]}
      <FormFieldErrorMessage name={props.name} />
    </div>
  );
};

export default LenSqrFormField;

export const FormLabel = ({ label, className = "", withAsterisk, ...rest }: FormLabelProps) => {
  return (
    <BootstrapForm.Label {...rest} className={`${styles.labelStyle} ${className}`}>
      {label}
      {withAsterisk && <span className="text-danger">*</span>}
    </BootstrapForm.Label>
  );
};

export const InputField = (props: InputFieldProps) => {
  const [focus, setFocus] = useState(false);
  const { className = "", disabled, setHasError, hasError, ...rest } = props;
  const [field, meta] = useField(rest);

  useEffect(() => {
    meta?.error && meta?.touched ? setHasError(true) : setHasError(false);
  }, [meta?.error, meta?.touched, setHasError]);

  const _onFocus = () => {
    !focus && setFocus(true);
  };

  const _onBlur = () => {
    focus && setFocus(false);
  };

  return (
    <BootstrapForm.Control
      {...(rest as any)}
      {...(field as any)}
      onBlur={(e) => {
        field?.onBlur?.(e);
        rest?.onBlur?.(e as any);
        _onBlur();
      }}
      onFocus={(e) => {
        _onFocus();
        rest?.onFocus?.(e as any);
      }}
      placeholder={rest?.placeholder}
      id={rest?.id || rest?.name}
      className={`${styles.formControlStyle} ${Boolean(field?.value) && !focus ? styles.formControlStyleGradient : ""} ${
        meta?.error && meta?.touched ? styles.formControlStyleError : ""
      } ${className}`}
      disabled={disabled}
    />
  );
};

export const PasswordField = (props: PasswordFieldProps) => {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { className = "", disabled, setHasError, hasError, ...rest } = props;
  const [field, meta] = useField(rest);

  useEffect(() => {
    meta?.error && meta?.touched ? setHasError(true) : setHasError(false);
  }, [meta?.error, meta?.touched, setHasError]);

  const _onFocus = () => {
    !focus && setFocus(true);
  };

  const _onBlur = () => {
    focus && setFocus(false);
  };

  return (
    <div className={styles.passwordFieldWrapper}>
      <BootstrapForm.Control
        {...(rest as any)}
        {...(field as any)}
        type={showPassword ? "text" : "password"}
        onBlur={(e) => {
          field?.onBlur?.(e);
          rest?.onBlur?.(e as any);
          _onBlur();
        }}
        onFocus={(e) => {
          _onFocus();
          rest?.onFocus?.(e as any);
        }}
        placeholder={rest?.placeholder}
        id={rest?.id || rest?.name}
        className={`${styles.formControlStyle} ${Boolean(field?.value) && !focus ? styles.formControlStyleGradient : ""} ${
          meta?.error && meta?.touched ? styles.formControlStyleError : ""
        } ${className}`}
        disabled={disabled}
      />
      <span className={styles.togglePassword} onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "HIDE" : "SHOW"}
      </span>
    </div>
  );
};

export const FormFieldErrorMessage = (props: { name: string }) => {
  return <ErrorMessage name={props.name} component="div" className={`${styles.errorMessage}`} />;
};