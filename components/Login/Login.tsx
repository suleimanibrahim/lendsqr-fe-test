"use client"
import React from "react";
import {  Col, Form, Row } from "react-bootstrap"
import Image from "next/image";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../Common/CustomButton";
import LenSqrFormField from "../Common/Fields/LenSqrFormField";
import Link from "next/link";
import styles from "./Login.module.scss";

export const Login = ()=>{

    const handleSubmitter = (values:any) => {
        console.log(values);
    };
    const formik = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
        onSubmit: handleSubmitter,
    
        validationSchema: Yup.object({
          username: Yup.string()
            .required("Email address is required")
            .email("Invalid email address"),
          password: Yup.string().required("Password is required"),
        }),
      });
    
    const { handleSubmit } = formik;

    return (
        <div className={styles.content}>
        <Row className={styles.fullHeight}>
          <Col xs={6} md={6} className={`${styles.leftItem} ${styles.hideOnMobile}`}>
           <div className={styles.logo}>
             <img 
               src="/logo.svg" 
               loading="lazy"  
               alt="leftLogo" 
               className={styles.logoImg} 
             />
           </div>
            <div className={styles.imageWrapper}>
              <img src="/bigLogo.svg" alt="leftLogo" loading="lazy" className={styles.leftImg} />
            </div>
          </Col>
          <Col xs={12} md={6} className={styles.rightItem}>
           <div className={styles.rightItemLabel}>
            <span className="font40">WELCOME!</span>
            <span className="font20">Enter details to login.</span>
           </div>
          <div className={styles.formContainer}>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
                <div className={styles.innerWrapper}>
                <Col xs={12} md={12} className="mb-4  w-full">
                 <LenSqrFormField
                    name="username"
                    id="email"
                    type="email"
                    componentName="input-text"
                    placeholder="Email"
                    />
                </Col>
                <Col xs={12} md={12} className="mb-4">
                    <LenSqrFormField
                    name="password"
                    placeholder="Password"
                    componentName="password"
                    />
                </Col>
                <Col xs={12} md={12} className="mb-4">
                 <Link
                    className="font12 baseColor cursor-pointer"
                    href="/auth/reset"
                    >
                    {" "}
                    FORGOT PASSWORD?{" "}
                 </Link>
                </Col>

                <Col xs={12} md={12}>
                    <CustomButton
                    type="submit"
                    text="LOG IN"
                    />
                </Col>
                </div>
            </Form>
          </FormikProvider>
          </div>       
          </Col>
        </Row>
        </div>
    )
}