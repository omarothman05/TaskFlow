"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import API from "../../../../api"


export default function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      router.push("/");


    } catch (err) {
      alert("Server error ❌");
    }

  };

  

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow-md w-[350px]">

        <h1 className="text-2xl font-bold text-center mb-5">
          Login
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
                className="bg-black text-white p-2 rounded hover:bg-gray-800"
              >
                Login
              </button>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
}