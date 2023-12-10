"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm, useController } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Visibility, VisibilityOff, CalendarToday } from "@material-ui/icons";
import Modal from "react-modal";
import DatePicker from "./Calendar";
import Container from "./Container";

interface SignUpProps {
  onSignInClick: () => void; // Add this line
}

const SignUp: React.FC<SignUpProps> = ({ onSignInClick }) => {
  const { control, handleSubmit, reset } = useForm();

  const namePattern = /^[a-zA-Z ]*$/;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phonePattern = /^[0-9]{10}$/; // Adjust according to your requirements
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,14}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    field: fullNameField,
    fieldState: { error: fullNameError },
  } = useController({
    name: "fullName",
    control,
    defaultValue: "",
    rules: {
      required: "Full Name is required",
      pattern: {
        value: namePattern,
        message: "Full Name should not contain special characters or numbers",
      },
    },
  });

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
        message: "Invalid email address",
      },
    },
  });

  const {
    field: phoneField,
    fieldState: { error: phoneError },
  } = useController({
    name: "phone",
    control,
    defaultValue: "",
    rules: {
      required: "Phone number is required",
      pattern: {
        value: phonePattern,
        message: "Invalid phone number",
      },
    },
  });

  const {
    field: dobField,
    fieldState: { error: dobError },
  } = useController({
    name: "dob",
    control,
    defaultValue: "",
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
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      maxLength: {
        value: 14,
        message: "Password must not exceed 14 characters",
      },
      pattern: {
        value: passwordPattern,
        message:
          "Password must contain 1 lowercase, 1 uppercase, and 1 special character",
      },
    },
  });

  const {
    field: confirmPasswordField,
    fieldState: { error: confirmPasswordError },
  } = useController({
    name: "confirmPassword",
    control,
    defaultValue: "",
    rules: {
      required: "Confirm Password is required",
      validate: (value) =>
        value === control._formValues.password || "Passwords do not match",
    },
  });

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   toast.success("SignUp in successfully!");
  // };

  const onSubmit = async (data: any) => {
    try {
        const response = await fetch('/api/user', { // Replace 'your-endpoint' with the actual path, e.g., '/api/user'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Account created:', responseData);
            toast.success("SignUp successfully!");
            handleCancel()
        } else {
            const errorData = await response.json();
            console.error('Signup error:', errorData.message);
            toast.error(errorData.message);
        }
    } catch (error) {
        console.error('Failed to submit form', error);
        toast.error("Failed to create account");
    }
};
  //@ts-ignore
  const handleDateChange = (date) => {
    setSelectedDate(date);
    dobField.onChange(date.toISOString().split("T")[0]); // Format the date as required
    setShowDatePicker(false); // Hide the DatePicker
  };
  //@ts-ignore
  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      //@ts-ignore
      !datePickerRef.current.contains(event.target)
    ) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCancel = () => {
    reset({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      password: "",
      confirmPassword: "",
    });
    setSelectedDate(null);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Container>
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <div className="w-full max-w-md">
        {" "}
        {/* Adjusted for wider container */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <div className="flex justify-center mb-4">
              <div className="rounded-full p-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg"
                  alt="User Icon"
                  className="rounded-full h-20 w-20"
                />
              </div>
            </div>
            {/* Sign In Link */}
            <div className="text-center text-sm text-gray-600 mb-4">
              Already have an account?{" "}
              <button
                className="text-pink-500 hover:text-pink-600 focus:outline-none background-transparent"
                onClick={onSignInClick}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Sign in
              </button>
            </div>

            {/* Full Name Field */}
            <div className="mb-4">
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...fullNameField}
              />
              {fullNameError && (
                <p className="text-red-500 text-xs">{fullNameError.message}</p>
              )}
            </div>
            {/* Email Field */}
            <div className="mb-4">
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
            {/* Phone Field */}
            <div className="mb-4">
              <input
                id="phone"
                type="tel"
                placeholder="Phone no."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...phoneField}
              />
              {phoneError && (
                <p className="text-red-500 text-xs">{phoneError.message}</p>
              )}
            </div>
            {/* Date of Birth Field */}

            <div className="mb-4 relative">
              <input
                id="dob"
                type="text"
                placeholder="DOB"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onFocus={() => setShowDatePicker(true)}
                //@ts-ignore
                value={
                  dobField.value
                    ? new Date(dobField.value).toLocaleDateString()
                    : ""
                }
                readOnly // Make this input read-only
                {...dobField}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                onClick={() => setShowDatePicker(true)}
              >
                <CalendarToday />
              </div>
              {dobError && (
                <p className="text-red-500 text-xs">{dobError.message}</p>
              )}

              {showDatePicker && (
                <div ref={datePickerRef} className="absolute z-10">
                  <DatePicker
                    //@ts-ignore
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                {...passwordField}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 pb-2 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
              {passwordError && (
                <p className="text-red-500 text-xs">{passwordError.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...confirmPasswordField}
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-xs">
                  {confirmPasswordError.message}
                </p>
              )}
            </div>
            {/* Terms and Conditions */}
            <div className="mt-4 mb-5 text-center text-xs">
              By signing up, you agree to the ImpactHub terms of service and
              privacy notice.
            </div>
            {/* Submit and Cancel Buttons */}
            <div className="flex items-center justify-between">
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline border-2"
                type="submit"
              >
                Sign up
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

export default SignUp;
