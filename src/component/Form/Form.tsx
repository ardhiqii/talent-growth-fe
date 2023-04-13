import React, { useContext, useState } from "react";
import styles from "./form.module.css";
import { FormProps } from "../../interfaces";
import { login, register } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-contex";
const Form = ({ haveAccount }: FormProps) => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [invalidValue, setInvalidValue] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  type TypeInput = "email" | "password" | "fullName";
  const handlerInputChange = (
    type: TypeInput,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const newValue = e.currentTarget.value;
    setInput((prev) => {
      return {
        ...prev,
        [type]: newValue,
      };
    });
  };
  const changePageHandler = () => {
    const page = haveAccount ? "/register" : "/";
    navigate(page);
  };
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setInput({
      fullName: "",
      email: "",
      password: "",
    });
    try {
      let response;
      let data;
      if (haveAccount) {
        response = await login(input.email, input.password);
      } else {
        response = await register(input.fullName, input.email, input.password);
      }
      setInvalidValue(false);
      console.log(response);
      const token = response.data.accessToken;
      authCtx.setToken?.(token);
      navigate("/homepage", { replace: true });
    } catch (e: any) {
      const status = e.response.status;
      if (status == 404 || status == 401) {
        setInvalidValue(true);
      }
      console.log("error", e.response);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{haveAccount ? "Login" : "Register"}</h1>
      </div>
      <form>
        {!haveAccount && (
          <label>
            <p className={`${invalidValue && `${styles.redText}`}`}>
              fullName:
            </p>
            <input
              className={`${invalidValue && `${styles.invalid}`}`}
              type="text"
              onChange={handlerInputChange.bind(this, "fullName")}
              value={input.fullName}
            />
          </label>
        )}

        <label>
          <p className={`${invalidValue && `${styles.redText}`}`}>Email:</p>
          <input
            className={`${invalidValue && `${styles.invalid}`}`}
            type="text"
            onChange={handlerInputChange.bind(this, "email")}
            value={input.email}
          />
        </label>
        <label>
          <p className={`${invalidValue && `${styles.redText}`}`}>Password:</p>
          <input
            className={`${invalidValue && `${styles.invalid}`}`}
            type="password"
            onChange={handlerInputChange.bind(this, "password")}
            value={input.password}
          />
        </label>
        {invalidValue && (
          <>
            <p
              className={`${
                invalidValue && `${styles.invalid} ${styles.invalidText}`
              }`}
            >
              *Email atau password yang dimasukkan salah
            </p>
          </>
        )}
        <div className="">
          <a className={styles.buttonChange} onClick={changePageHandler}>
            {haveAccount ? "Create Account" : "Sign in"}
          </a>
        </div>
        <button onClick={submitHandler} type="submit">
          {haveAccount ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Form;
