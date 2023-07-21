import React, { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Formik, ErrorMessage, Field } from "formik";
import { Register as RegisterType } from "../types/auth";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { authActions } from "../redux/slice/index";
import { Navigate } from "react-router-dom";
import Skeleton from "../assets/images/Skeleton.png";
import { setMessageEmpty } from "../redux/slice/auth.slice";
import { registerValidationSchema } from "../validations/auth";

const Register: FC = () => {
    const dispatch = useAppDispatch();

    const isLogin = useAppSelector((state) => state.authSlice.isLogin);
    let errorMessage = useAppSelector((state) => state.authSlice.error);
    let successMessage = useAppSelector((state) => state.authSlice.message);

    const formikRef = useRef(null);

    useEffect(() => {
        dispatch(setMessageEmpty());
    }, [dispatch]);

    if (isLogin) return <Navigate to={"/"} />;

    const initialValues: RegisterType = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    };

    const handleOnSubmit = async (values: RegisterType) => {
        //@ts-ignore
        dispatch(authActions.register(values));
    };

    const handleDeleteMessage = () => {
        errorMessage = "";
        successMessage = "";
    };

    return (
        <>
            <div className="container mx-auto">
                <div className="min-h-screen h-full mt-[100px] flex items-center justify-center">
                    <div className="bg-primary m-4 rounded-xl shadow-lg">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={registerValidationSchema}
                            onSubmit={handleOnSubmit}
                            innerRef={formikRef}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit} className="p-4" onChange={handleDeleteMessage}>
                                    <h1 className="font-bold text-[32px] text-center text-title">SIGN UP</h1>

                                    <div className="flex gap-5 shrink-0 mb-3">
                                        <div className="flex-1 flex flex-col">
                                            <label htmlFor="first_name" className="text-sm mb-1 tablet:text-xl">
                                                First Name
                                            </label>
                                            <Field
                                                type="text"
                                                name="first_name"
                                                className={`${
                                                    formik.errors.first_name && formik.touched.first_name
                                                        ? "border-error"
                                                        : ""
                                                } px-2 py-4 rounded-lg border-[1px] outline-none max-w-sm`}
                                            />
                                            <ErrorMessage
                                                name="first_name"
                                                component="span"
                                                className="text-[14px] text-error font-medium"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <label htmlFor="last_name" className="text-sm mb-1 tablet:text-xl">
                                                Last Name
                                            </label>
                                            <Field
                                                type="text"
                                                name="last_name"
                                                className={`${
                                                    formik.errors.last_name && formik.touched.last_name
                                                        ? "border-error"
                                                        : ""
                                                } px-2 py-4 rounded-lg border-[1px] outline-none max-w-sm`}
                                            />
                                            <ErrorMessage
                                                name="last_name"
                                                component="span"
                                                className="text-[14px] text-error font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="text-sm block mb-1 tablet:text-xl">
                                            Email
                                        </label>
                                        <Field
                                            type="text"
                                            name="email"
                                            className={`${
                                                formik.errors.email && formik.touched.email ? "border-error" : ""
                                            } px-2 py-4 rounded-lg border-[1px] outline-none w-full`}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="text-[14px] text-error font-medium"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="text-sm block mb-1 tablet:text-xl">
                                            Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            className={`${
                                                formik.errors.password && formik.touched.password ? "border-error" : ""
                                            } px-2 py-4 rounded-lg border-[1px] outline-none w-full`}
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="text-[14px] text-error font-medium"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirm_password" className="text-sm block mb-1 tablet:text-xl">
                                            Confirm Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="confirm_password"
                                            className={`${
                                                formik.errors.confirm_password && formik.touched.confirm_password
                                                    ? "border-error"
                                                    : ""
                                            } px-2 py-4 rounded-lg border-[1px] outline-none w-full`}
                                        />
                                        <ErrorMessage
                                            name="confirm_password"
                                            component="span"
                                            className="text-[14px] text-error font-medium"
                                        />
                                        {errorMessage !== "" && (
                                            <span className="text-[14px] text-error font-medium">{errorMessage}</span>
                                        )}
                                        {successMessage !== "" && (
                                            <span className="text-[14px] text-success font-medium">
                                                {successMessage}
                                            </span>
                                        )}
                                    </div>
                                    <div className="py-[12px]">
                                        <button
                                            disabled={errorMessage !== "" ? true : false}
                                            type="submit"
                                            className="btn btn-primary w-full text-lg"
                                        >
                                            Create Account
                                        </button>
                                    </div>
                                    <div className="text-center space-y-[8px]">
                                        <p className="block mt-3 mb-2 text-center text-lg">
                                            Already have an account?
                                            <span className="font-medium hover:opacity-80">
                                                <Link to={"/login"}> Login</Link>
                                            </span>
                                        </p>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                    <div className="hidden laptop:block transition ease-in-out hover:scale-110 duration-200">
                        <img src={Skeleton} alt="Freshemy"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
