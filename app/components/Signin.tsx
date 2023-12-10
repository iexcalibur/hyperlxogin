"use client";

import React from "react";
import { useForm, useController, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Container from "./Container";

interface SignInProps {
  onSignUpClick: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignUpClick }) => {
  const { control, handleSubmit, reset } = useForm();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,14}$/;

  const {
    field: emailField,
    fieldState: { error: emailError },
  } = useController({
    name: "email",
    control,
    defaultValue: "",
    rules: {
      required: "Email is required",
      pattern: {
        value: emailPattern,
        message: "Email is invalid",
      },
    },
  });

  const {
    field: passwordField,
    fieldState: { error: passwordError },
  } = useController({
    name: "password",
    control,
    defaultValue: "",
    rules: {
      required: "Password is required",
      pattern: {
        value: passwordPattern,
        message: "",
      },
    },
  });

  const onSubmit = async (data: any) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const user = await response.json();
            console.log('Logged in user:', user);
            toast.success("Signed in successfully!");
            handleCancel()
            
        } else {
            const errorData = await response.json();
            console.error('Login error:', errorData.message);
            toast.error(errorData.message);
        }
    } catch (error) {
        console.error('Failed to submit form', error);
        toast.error("Failed to sign in");
    }
};
  const handleCancel = () => {
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <Container>
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <div className="w-full max-w-l">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <div className="flex justify-center">
              <div className="rounded-full p-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
                  alt="User Icon"
                  className="rounded-full h-40 w-40"
                />
              </div>
            </div>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                className="text-pink-500 hover:text-pink-600 focus:outline-none background-transparent"
                onClick={onSignUpClick}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Sign up
              </button>
            </div>
            <div className="mb-4 mt-6">
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...emailField}
              />
              {emailError && (
                <p className="text-red-500 text-xs">{emailError.message}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                {...passwordField}
              />
              {passwordError && (
                <p className="text-red-500 text-xs">{passwordError.message}</p>
              )}
              <p className="text-red-500 text-xs">Forgot your password?</p>
            </div>
            <div className="mt-4 mb-5 text-center text-xs">
              By continuing, you agree to the ImpactHub terms of service and
              privacy notice.
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline border-2"
                type="submit"
              >
                Sign in
              </button>
              <button
                className="inline-block align-baseline font-bold text-sm text-pink-500 hover:text-pink-800 border-2 py-2 px-10"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </Container>
  );
};

export default SignIn;
