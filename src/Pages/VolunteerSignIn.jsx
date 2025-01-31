import { GoogleButton } from 'react-google-button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';

function VolunteerSignIn() {
  const { googleSigninWithRedirect, createUserWithPwAndEmail, signout } =
    useGlobalVolunteerContext();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Sign in with Google (firebase)
  const googleSignin = async () => {
    try {
      await googleSigninWithRedirect();
    } catch (err) {
      console.log(err);
    }
  };

  // Sign up with Email and Password - (firebase)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithPwAndEmail(
        form.email,
        form.password
      );
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-full w-[100%] flex justify-center items-center">
      <div className="w-[30%] flex flex-col justify-center items-center mt-16 space-y-4 p-6 border border-gray-200 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wider">
          Sign up
        </h1>
        <p className="text-blue-700">
          Don't have an account yet?{' '}
          <Link to="/signup" className="underline">
            Sign up.
          </Link>
        </p>
        <p className="text-gray-500 tracking-wider font-semibold">
          For Hope volunteers
        </p>
        <div className="flex flex-col justify-center items-center w-full">
          <form onSubmit={onSubmitHandler} className="mt-4">
            <div className="flex flex-col justify-center items-center space-y-8">
              <input
                type="text"
                onChange={onChangeHandler}
                name="email"
                value={form.email}
                placeholder="Email"
                className="input input-bordered input-info w-[70vw] max-w-xs"
              />
              <input
                type="text"
                onChange={onChangeHandler}
                name="password"
                value={form.password}
                placeholder="Password"
                className="input input-bordered input-info w-[70vw] max-w-xs"
              />
            </div>
            <div className="flex justify-center items-center mt-8">
              <button className="btn btn-info w-full text-white">
                Sign in
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-10">
            <GoogleButton onClick={googleSignin} />
          </div>
          <div className="mt-4">
            <button onClick={signout} className="btn btn-primary">
              Signout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerSignIn;
