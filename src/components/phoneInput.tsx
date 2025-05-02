"use client";

import { useState, type FormEvent } from "react";
import PhoneInput from "react-phone-number-input";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { CheckCircle2 } from "lucide-react";
import flags from "react-phone-number-input/flags";

// Import the styles for the phone input
import "react-phone-number-input/style.css";

export default function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      setIsValid(false);
      setErrorMessage("Phone number is required");
      return;
    }

    if (!isPossiblePhoneNumber(phoneNumber)) {
      setIsValid(false);
      setErrorMessage("Please enter a valid phone number");
      return;
    }

    // If we get here, the phone number is valid
    setIsValid(true);
    setErrorMessage("");
    setIsSubmitted(true);

    // In a real app, you would submit the form data to your backend here
    console.log("Submitted phone number:", phoneNumber);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="phone-input"
          className="block text-gray-800 text-lg font-medium mb-2"
        >
          Phone number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <PhoneInput
            international
            defaultCountry="PK"
            flags={flags}
            value={phoneNumber}
            onChange={(value) => {
              setPhoneNumber(value || "");
              if (errorMessage) {
                setIsValid(true);
                setErrorMessage("");
              }
            }}
            className={`custom-phone-input ${!isValid ? "error" : ""}`}
            id="phone-input"
          />
          {isSubmitted && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
              <CheckCircle2 size={20} />
            </div>
          )}
        </div>
        {!isValid && (
          <p id="phone-error" className="mt-1 text-red-500 text-sm">
            {errorMessage}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-full transition-colors"
      >
        Submit
      </button>
      {isSubmitted && (
        <p className="mt-2 text-green-600 text-center">
          Phone number submitted successfully!
        </p>
      )}
    </form>
  );
}
