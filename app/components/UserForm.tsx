// components/UserForm.tsx
"use client";
import React, { useState } from "react";
import { FormData, FormField } from "@/app/types/userForm";
import { FormEvent, ChangeEvent } from "react";

const UserForm = () => {
  const formFields: FormField[] = [
    { type: "text", name: "name", placeholder: "Name" },
    { type: "number", name: "age", placeholder: "Age" },
    { type: "email", name: "email", placeholder: "Email" },
  ];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: 0,
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    // Convert to number if the input type is 'number'
    const updatedValue = type === "number" ? Number(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error submitting form");
      }

      // Just fpr testing
      // const result = await response.json();
      // console.log(result);

      setSubmitSuccess("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md"
      >
        {formFields.map((field, index) => (
          <input
            key={index}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            className="border p-2 rounded"
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {submitError && <div className="text-red-500">{submitError}</div>}
        {submitSuccess && <div className="text-green-500">{submitSuccess}</div>}
      </form>
    </>
  );
};

export default UserForm;

{
  /* <form
onSubmit={handleSubmit}
className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md"
>
<input
  type="text"
  name="name"
  placeholder="Name"
  className="border p-2 rounded"
  value={formData.name}
  onChange={handleChange}
/>
<input
  type="number"
  name="age"
  placeholder="Age"
  className="border p-2 rounded"
  value={formData.age}
  onChange={handleChange}
/>
<input
  type="email"
  name="email"
  placeholder="Email"
  className="border p-2 rounded"
  value={formData.email}
  onChange={handleChange}
/>
<button
  type="submit"
  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
  disabled={isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Submit"}
</button>
{submitError && <div className="text-red-500">{submitError}</div>}
{submitSuccess && <div className="text-green-500">{submitSuccess}</div>}
</form> */
}
