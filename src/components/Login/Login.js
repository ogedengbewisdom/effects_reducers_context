import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailManager = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.includes("@")}
  }else if (action.type === "USER_BLUR") {
    return {value: state.value, isValid: state.value.includes("@")}
  }
  return {value: "", isValid: false}
}

const emailPasswordManager = (state, action) => {
  if (action.type === "USER_PASSWORD") {
    return {value: action.val, isValid: action.val.trim().length > 6}
  } if (action.type === "PASSWORD_BLUR") {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: "", isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailManager, {
    value: "",
    isValid: null
  })

  const [emailPasswordState, dispatchEmailPassword] = useReducer(emailPasswordManager, {
    value: "",
    isValid: null
  })
  console.log("ad")

  // useEffect(() => { 
  //   const identifier = setTimeout(() => {
  //     console.log("Checking form validity")
  //     setFormIsValid(enteredEmail.includes("@") && enteredPassword.trim().length > 6)
  //   }, 500)
  //     return () => {
  //       console.log("CLEANUP")
  //       clearTimeout(identifier)
  //     }
  // }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value})
    
  };

  const passwordChangeHandler = (event) => {
    dispatchEmailPassword({type: "USER_PASSWORD", val: event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "USER_BLUR"});
  };

  const validatePasswordHandler = () => {
    dispatchEmailPassword({type: "PASSWORD_BLUR"})
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, emailPasswordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            emailPasswordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete={emailPasswordState.value}
            value={emailPasswordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!emailPasswordState.isValid || !emailState.isValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};


export default Login;
