"use client"
import { ReactNode, Suspense, useState } from "react";
import { Sidebar } from "./fragments/Sidebar";
import styles from "./dashboard.module.scss";
import Image from "next/image";
import SearchInput from "@/components/Common/SearchInput/SearchInput";
import { Form } from "react-bootstrap";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

export default function Layout({ children }: { children: ReactNode }) {
    const [showNav, setShowNav] = useState(false);
   
    const handleSubmitter = (values:any) => {
  };
  const formik = useFormik({
      initialValues: {
        search: "",
      },
      onSubmit: handleSubmitter,
      validationSchema: Yup.object({
        search: Yup.string().optional()
      }),
    });
  const { handleSubmit } = formik;

    return (
        <div className={styles.container}>
        <Sidebar showNav={showNav} setShowNav={setShowNav} />
        <div className={styles.mainContent}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.headerLeft}>
                      <Image src="/logo.svg" alt="" width={144} height={30} />
                      <div className={styles.flexContainer}>
                        <button
                          data-collapse-toggle="navbar-cta"
                          type="button"
                          className={styles.button}
                          aria-controls="navbar-cta"
                          aria-expanded="false"
                          onClick={() => setShowNav(!showNav)}
                        >
                          <svg
                            className={styles.svg}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h15M1 7h15M1 13h15"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className={styles.searchSection}>
                        <FormikProvider value={formik}>
                          <Form onSubmit={handleSubmit}>
                          <SearchInput 
                            placeholder="Search for anything" 
                            className={styles.searchInput}
                            name="search"
                          />
                          </Form>
                        </FormikProvider> 
                      </div>
                    </div>
                    <div className={styles.rightMenu}>
                      <span className="font16">Docs</span>
                      <Image src="/np_notification.svg" alt="" width={26} height={26} />
                      <div className={styles.rightMenuChild}>
                        <Image className={styles.avatarImg} src="/avatar.svg" alt="" width={50} height={30} />
                        <span className="font16 weight500">Adedeji</span>
                        <Image src="/np_dropdown.svg" alt="" width={20} height={20} />
                      </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
             <Suspense fallback={<div>Loading...</div>}>
                {children}
             </Suspense>   
            </div>
        </div>
    </div>
    )
}