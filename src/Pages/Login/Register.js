import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Register = () => {
    const { createUser, updateUser, handelGoogleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handelRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;
        const option = form.option.value;

        const users = {
            name,
            email,
            option
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                const userInfo = {
                    displayName: name
                }

                // jet implement
                const currentUser = {
                    email: user.email
                }
                fetch('https://market-thrifty-server.vercel.app/jwt', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('marketThrifty-token', data.token);

                        // update user
                        updateUser(userInfo)
                            .then(() => {
                                fetch(`https://market-thrifty-server.vercel.app/users`, {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify(users)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        toast.success('User Created Successfully');
                                        navigate(from, { replace: true });
                                        form.reset();
                                    })
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    })
                form.reset();
            })
            .catch(err => console.error(err))
    }

    const googleLogin = () => {
        handelGoogleLogin()
            .then(result => {
                const user = result.user;
                const googleUser = {
                    name: user.displayName,
                    email: user.email,
                    option: "Buyer"
                };

                const currentUser = {
                    email: user.email
                }
                fetch('https://market-thrifty-server.vercel.app/jwt', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('marketThrifty-token', data.token);

                        fetch(`https://market-thrifty-server.vercel.app/users`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(googleUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                toast.success('User Created Successfully');
                                navigate(from, { replace: true });
                            })
                    })
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='flex justify-center my-10 mx-2'>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-2xl bg-gray-100 text-gray-900">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form onSubmit={handelRegister} className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block text-gray-900">User Name</label>
                        <input type="text" name="userName" id="userName" placeholder="User Name" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-gray-900">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-gray-900">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-700 bg-gray-200 text-gray-900 focus:border-violet-400" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Choose an option</span>
                        </label>
                        <select name='option' className="select select-bordered">
                            <option defaultValue>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>
                    <button className="block w-full p-3 btn btn-outline text-center font-bold rounded-lg text-gray-900">Sign Up</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                    <p className="px-3 text-sm text-gray-900">Sign Up with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={googleLogin} className="block w-full p-3 btn btn-outline text-center font-bold rounded-lg text-gray-900">Sign Up With Google</button>
                </div>
                <p className="text-xs text-center sm:px-6 text-gray-900">Have an account?
                    <Link to="/login" className="underline text-gray-900">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;