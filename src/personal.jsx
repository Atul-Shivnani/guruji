import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { personalSchema } from "./zodSchemas/schemas";
import Card from "./card";
import Form from "./form";
import Heading from "./heading";

const Personal = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("data")) || {};
    setPersonalDetails(savedData.personal || {
      name: "",
      email: "",
      phone: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value,
    });
  };

  const getErrorMessage = (fieldName) => {
    const error = errors.find((err) => err.path[0] === fieldName);
    return error ? error.message : null;
  };

  const handleNext = () => {
    const parsedData = personalSchema.safeParse(personalDetails);
    if (!parsedData.success) {
      const errorList = parsedData.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));
      setErrors(errorList);
    } else {
      setErrors([]);
      localStorage.setItem("data", JSON.stringify({
        ...JSON.parse(localStorage.getItem("data")) || {},
        personal: personalDetails,
      }));
      navigate("/step2");
    }
  };

  return (
    <Card>
      <Heading text="Personal Information" />
      <Form>
        <label htmlFor="name" className="text-sm md:text-base lg:text-lg">Name</label>
        <input
          type="text"
          placeholder="Nitish Kumar"
          id="name"
          name="name"
          value={personalDetails.name}
          onChange={handleChange}
          required
          className="bg-transparent border-purple-300 border-2 p-2 text-sm md:text-base lg:text-lg"
        />
        {getErrorMessage("name") && (
          <span className="text-red-500 text-sm md:text-base lg:text-lg">{getErrorMessage("name")}</span>
        )}
        <br />

        <label htmlFor="email" className="text-sm md:text-base lg:text-lg">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          value={personalDetails.email}
          onChange={handleChange}
          required
          className="bg-transparent border-purple-300 border-2 p-2 text-sm md:text-base lg:text-lg"
        />
        {getErrorMessage("email") && (
          <span className="text-red-500 text-sm md:text-base lg:text-lg">{getErrorMessage("email")}</span>
        )}
        <br />

        <label htmlFor="phone" className="text-sm md:text-base lg:text-lg">Phone no.</label>
        <input
          type="tel"
          placeholder="0123456789"
          id="phone"
          name="phone"
          value={personalDetails.phone}
          onChange={handleChange}
          required
          className="bg-transparent border-purple-300 border-2 p-2 text-sm md:text-base lg:text-lg"
        />
        {getErrorMessage("phone") && (
          <span className="text-red-500 text-sm md:text-base lg:text-lg">{getErrorMessage("phone")}</span>
        )}
        <br />

        <div className="gap-2 md:gap-4 flex flex-col md:flex-row">
          <button
            className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 w-full md:w-1/2 text-sm md:text-base lg:text-lg transition-all ease-in-out delay-75 cursor-not-allowed"
          >
            {"<Prev"}
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 w-full md:w-1/2 text-sm md:text-base lg:text-lg hover:bg-purple-300 shadow-xl hover:border-purple-400 transition-all ease-in-out delay-75 hover:shadow-md"
          >
            {"Next>"}
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default Personal;
