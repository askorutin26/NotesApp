import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuthContext } from "../Hooks/index.js";
import routes from "../routes.js";

const { app, server } = routes;
export default function Signup() {
  const AuthContext = useAuthContext();

  const { logIn } = AuthContext;
  const [errorName, setErrName] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("usernameRequired")
      .min(3, "shortUsername")
      .max(20, "longUsername"),
    password: yup.string().required("passwordRequired").min(6, "shortPassword"),
    repeatedPassword: yup
      .string()
      .required("passwordRequired")
      .oneOf([yup.ref("password"), null], "passwordsMismatch"),
  });

  return (
    <Container bsPrefix="container-fluid h-100">
      <Container bsPrefix="row justify-content-center align-content-center h-100">
        <Container bsPrefix="col-12 col-md-8 col-xxl-6">
          <Container bsPrefix="card shadow-sm">
            <Container bsPrefix="card-body row p-5 justify-content-center">
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  repeatedPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const { username, password } = values;

                  axios
                    .post(server.signUp(), {
                      username,
                      password,
                    })
                    .then((response) => {
                      const { data } = response;
                      const { token, userID } = data;

                      setErrName("");
                      setSubmitting(false);
                      logIn(token, userID);
                      navigate(app.home());
                    })
                    .catch((error) => {
                      setSubmitting(false);
                      const errCode = error.response.status;
                      if (errCode === 409) {
                        setErrName("userExists");
                        setSubmitting(false);
                      } else {
                        setErrName("incorrectSignupData");
                        setSubmitting(false);
                      }
                    });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                    onSubmit={handleSubmit}
                  >
                    <h1 className="text-center mb-4">
                      {t("Signup.signingUp")}
                    </h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        id="username"
                        required
                        placeholder="your username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Label htmlFor="username">
                        {t("Signup.signupUser")}
                      </Form.Label>
                      {errors.username && touched.username ? (
                        <p className="text-danger">
                          {t(`signupErrors.${errors.username}`)}
                        </p>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder="your password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Label htmlFor="password">
                        {t("Signup.password")}
                      </Form.Label>
                      {errors.password && touched.password ? (
                        <p className="text-danger">
                          {t(`signupErrors.${errors.password}`)}
                        </p>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="repeatedPassword"
                        id="repeatedPassword"
                        required
                        placeholder="repeat password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.repeatedPassword}
                        isInvalid={
                          touched.repeatedPassword && !!errors.repeatedPassword
                        }
                      />
                      <Form.Label htmlFor="repeatedPassword">
                        {t("Signup.repeatPassword")}
                      </Form.Label>
                      {errors.repeatedPassword && touched.repeatedPassword ? (
                        <p className="text-danger">
                          {t(`signupErrors.${errors.repeatedPassword}`)}
                        </p>
                      ) : null}
                    </Form.Group>

                    <p className="text-danger">
                      {errorName && t(`signupErrors.${errorName}`)}
                    </p>

                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-100 mb-3 "
                    >
                      {t("Signup.signUp")}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Container>
            <Container bsPrefix="card-footer p-4">
              <Container bsPrefix="text-center">
                <span>{`${t("SignupBlock.noProfile")}?`} </span>
                <a href={app.signUp()}>{t("SignupBlock.signingUp")}</a>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
