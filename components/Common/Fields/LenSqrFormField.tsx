"use client";
import React, { ComponentProps, ReactNode, useEffect, useState } from "react";
import styles from "./FormField.module.scss";
import BootstrapForm from "react-bootstrap/Form";
import { FieldAttributes, ErrorMessage, useField, useFormikContext } from "formik";
import { Dropdown } from "react-bootstrap";

export type SelectOption = { name: any; value: any } & Partial<Record<any, any>>;
type TLenSqrFormFieldLabelError = {
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};
type ComponentName = "input-text" | "password" | "select" | "date";
type TypeObject = Record<ComponentName, ReactNode>;
type FormLabelProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  style?: ComponentProps<"label">["style"];
  withAsterisk?: boolean;
};
export type LenSqrFormFieldOtherProps = {
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

type SelectFieldProps = FieldAttributes<JSX.IntrinsicElements["select"]> &
LenSqrFormFieldOtherProps &
  Partial<TLenSqrFormFieldLabelError> & {
    id?: string;
    name: string;
    label?: string;
    loading?: boolean;
  } & (
    | {
        value?: SelectOption;
        options: SelectOption[];
        valueSelector?: (value: SelectOption) => any;
        onValueChange?: (value: SelectOption) => void;
      }
    | {
        value?: string;
        options: string[];
        valueSelector?: (value: string) => string;
        onValueChange?: (value: string) => void;
      }
  );


type LenSqrFormFieldProps =
  | ({
      componentName?: "input-text";
    } & FieldAttributes<LenSqrFormFieldOtherProps>)
  | ({
      componentName?: "date";
    } & FieldAttributes<LenSqrFormFieldOtherProps>)
  | ({
      componentName?: "password";
    } & FieldAttributes<LenSqrFormFieldOtherProps>)
  | ({
      componentName?: "select";
    } & SelectFieldProps)
  

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
    "date": (
      <DateInputField
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
    select: (
      <SelectField
        {...(rest as any)}
        hasError={hasError}
        setHasError={setHasError}
      />
    ),
  };

  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`}>
      {props.label && (
        <FormLabel
          label={props.label}
          htmlFor={props.id || props.name}
          className={`${styles.labelStyle} ${
            hasError ? styles.labelErrorStyle : ""
          } ${props.labelClassName}`}
          withAsterisk={labelAsterisk}
        />
      )}
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

export const SelectField = (props: SelectFieldProps) => {
  const {
    valueSelector,
    hasError,
    setHasError,
    options,
    label = "name",
    onValueChange,
    className = "",
    loading,
    ...rest
  } = props;

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(rest as any);
  useEffect(() => {
    meta?.error && meta?.touched ? setHasError?.(true) : setHasError?.(false);
  }, [meta?.error, meta?.touched, setHasError]);

  const isSelectionOptionsPredicate = (
    options: SelectOption[] | any[]
  ): options is SelectOption[] => {
    return (options?.[0] as SelectOption)?.name !== undefined;
  };

  const _onChange = (e: any) => {
    const val = e.target.value;    
    let option;

    if (isSelectionOptionsPredicate(options)) {
      option =
        options.find((option:any) => option.value === val) ?? ({} as SelectOption);        
    } else {
      option = options.find((option:any) => option === val) ?? "";
    }
    onValueChange?.(option as any);
    setFieldValue(field.name, val);
  };

  return (
    <select
      data-error={meta?.error && meta?.touched}
      {...rest}
      {...field}
      onChange={_onChange}
      className={`text-[12px] ${styles.formControlStyle} ${
        Boolean(field?.value) ? styles.formControlStyleGradient : ''
      } ${meta?.error && meta?.touched ? styles.formControlStyleError : ''} ${
        styles.selectField
      } ${className}`}
    >
      {options.map((option:any, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
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
export const DateInputField = (props: InputFieldProps) => {
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
    <input
     type="date"
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
    className={`${styles.dateInput} ${Boolean(field?.value) && !focus ? styles.formControlStyleGradient : ""} ${
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