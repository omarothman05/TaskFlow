"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import API from "../../../../api";

export default function RegisterPage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values) => {

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await res.json();
  

  if (!res.ok) {
    alert(data.message || "Email already exists");
    return;
  }

  localStorage.setItem("token", data.token);
  router.push("/");
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[350px]">

        <h1 className="text-2xl font-bold text-center mb-5">
          Create Account
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-4">

              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border p-2 w-full rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-[#F5E933] hover:bg-[#F5E933]/75 p-2 rounded font-semibold"
              >
                Register
              </button>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
}