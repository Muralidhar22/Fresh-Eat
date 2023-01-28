import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import FormInput from 'components/formInput/FormInput.component';
import { UserContext } from 'contexts/user.context';

import styles from './SignIn.styles.module.css';

type SignInFormValuesType = {
  email: string;
  password: string;
};

const INITIAL_STATE = {
  email: '',
  password: '',
};

const TEST_LOGIN = {
  email: 'example@test.com',
  password: 'Test@1234',
};

const SignIn = () => {
  const [formState, setFormState] = useState<SignInFormValuesType>(INITIAL_STATE);
  const { userSignInHandler } = useContext(UserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { email, password } = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    userSignInHandler(email.value, password.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, changedProperty: keyof typeof formState) => {
    setFormState((prevState) => ({ ...prevState, [changedProperty]: event.target.value }));
  };

  const handleTestLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormState({
      email: TEST_LOGIN.email,
      password: TEST_LOGIN.password,
    });
  };

  return (
    <div className={styles.signInWrapper}>
      <h1 className="text-uppercase">sign in</h1>
      <section className={styles.signInFormContainer}>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            id="user-email"
            value={formState.email}
            type="email"
            name="email"
            onChange={(event) => handleChange(event, 'email')}
            required={true}
          />
          <FormInput
            label="Password"
            id="user-pwd"
            value={formState.password}
            type="password"
            name="password"
            onChange={(event) => handleChange(event, 'password')}
            required={true}
          />
          <button className={styles.signInBtn} type="submit">
            Sign In
          </button>
        </form>
        <button className={styles.testLoginBtn} onClick={handleTestLogin}>
          Fill Test Login
        </button>
        <div>
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/signup">
              <span className="text-bold-500">SignUp</span>
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
