import React from 'react';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const { data } = await axios.post("/api/v1/login", values);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
      return null;
    },
  });

  return (
    <div className='container'>
      <div className='row'>
      <Form onSubmit={formik.handleSubmit} className="col-lg-6">
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            {...formik.getFieldProps('username')}
            />
            {formik.touched.username && formik.errors.username ? (<div>{formik.errors.username}</div>) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
      </div>
    </div>
  );
  }
  
  export default Login;
