
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SearchInput.module.scss";


import { FieldAttributes, useField } from "formik";
import { ReactNode, useEffect, useState } from "react";
import BootstrapForm from "react-bootstrap/Form";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormFieldErrorMessage, PenaidFormFieldOtherProps } from "../Fields/LenSqrFormField";

type InputFieldProps = FieldAttributes<JSX.IntrinsicElements["input"]> & {
    hasError: boolean;
    setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  };

type ComponentName = "search-input";
type TypeObject = Record<ComponentName, ReactNode>;

type LenSqrFormFieldProps = {
    componentName?: ComponentName;
  } & FieldAttributes<PenaidFormFieldOtherProps>;

const SearchInput = (props: LenSqrFormFieldProps) => {
    const [hasError, setHasError] = useState(false);
    const { wrapperClassName, labelAsterisk, componentName = "search-input", ...rest } = props;
  
    const typeObj: TypeObject = {
      "search-input": (
        <SearchInputFiled
          {...(rest as any)}
          hasError={hasError}
          setHasError={setHasError}
        />
      )
    };
  
    return (
      <div className={`${styles.wrapper} ${wrapperClassName}`}>
        {typeObj[componentName]}
        <FormFieldErrorMessage name={props.name} />
      </div>
    );
  };

 export default SearchInput; 

export const SearchInputFiled = (props: InputFieldProps) => {
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
      <div className={styles.inputGroup}>
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
        className={`${styles.inputText} ${Boolean(field?.value) && !focus ? styles.formControlStyleGradient : ""} ${
          meta?.error && meta?.touched ? styles.formControlStyleError : ""
        } ${className}`}
        disabled={disabled}
      />
       <button type="button" className={`${styles.button}`}>
       <FontAwesomeIcon icon={faSearch} />
      </button>
      </div>  
    );
  };
  