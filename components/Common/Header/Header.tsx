"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./header.module.css";
import gbStyles from "../../common.module.css";
// import { useAuth } from "@/context/AuthContext/AuthContext";

const Header = () => {
  // const { profile } = useAuth();

  return (
    <>
      <Container className={`${styles.height} ${styles.desktop}`}>
        <Row className={`${styles.headerBlock} mx-0`}>
          <Col md={7} className={`p-0 ${styles.welcomeBack}`}>
            <p className={`font14 font700 m-0`}>Welcome back 👋</p>
            <p className={`font14 font500 ${styles.font14Color}`}>
              What would you like to do today?
            </p>
          </Col>
          <Col sm={5} className="p-0 d-flex justify-content-end">
            <div className="d-flex">
              <div className={`${styles.icon}`}>
                {/* <img
                  className={`${gbStyles.pointer}`}
                  src="/assets/images/header/notification-bell.svg"
                  loading="lazy"
                  alt="notification"
                /> */}
              </div>
              <div className={`${styles.icon}`}>
                {/* <img
                  className={`${gbStyles.pointer}`}
                  src="/assets/images/header/profile-user.svg"
                  loading="lazy"
                  alt="profile user"
                /> */}
              </div>
              <div className="details">
                <p className="font14 font700">
                  {/* {profile?.firstName ?? ""} {profile?.lastName ?? ""} */}
                </p>
                <p className={`font14 font400 ${styles.font14Color}`}>
                  {/* {profile?.emailId ?? ""} */}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className={`${styles.height} ${styles.mobile}`}>
        <Row className={`${styles.headerBlock} mx-0`}>
          <Col className={`p-0 ${styles.welcomeBack} col-6 d-flex`}>
            <div className={`${styles.icon}`}>
              {/* <img
                className={`${gbStyles.pointer}`}
                src="/assets/images/header/profile-user.svg"
                loading="lazy"
                alt="profile user"
              /> */}
            </div>
            <div className="details">
              <p className="font14 font700">
                {" "}
                {/* {profile?.firstName ?? ""} {profile?.lastName ?? ""} */}
              </p>
              <p className={`font14 font400 ${styles.font14Color}`}>
                {/* {profile?.emailId ?? ""} */}
              </p>
            </div>
          </Col>
          <Col className="p-0 d-flex justify-content-end col-6`">
            <div className="d-flex">
              <div className={`${styles.icon}`}>
                {/* <img
                  className={`${gbStyles.pointer}`}
                  src="/assets/images/header/notification-bell.svg"
                  loading="lazy"
                  alt="notification"
                /> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
