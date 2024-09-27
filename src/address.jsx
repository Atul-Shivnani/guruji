import { useState, useEffect } from "react";
import { addressSchema } from "./zodSchemas/schemas";
import Card from "./components/card";
import Form from "./components/form";
import Heading from "./components/heading";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";

const Address = () => {
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  const [addressDetails, setAddressDetails] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setStates(State.getStatesOfCountry('IN'));
    
    const savedData = JSON.parse(localStorage.getItem("data")) || {};
    
    if (!savedData.personal) {
      navigate("/"); 
      alert("Please fill out personal details first");
      return;
    }
    
    setAddressDetails(savedData.address || {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const stateName = states.find(state => state.isoCode === stateCode)?.name || '';

    setSelectedState(stateCode);
    setCities(City.getCitiesOfState('IN', stateCode));
    
    setAddressDetails(prev => ({
      ...prev,
      state: stateName
    }));
  };

  const handleNext = () => {
    const result = addressSchema.safeParse(addressDetails);
    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});

      const existingData = JSON.parse(localStorage.getItem("data")) || {};

      localStorage.setItem("data", JSON.stringify({
        ...existingData,
        address: addressDetails
      }));

      navigate("/step3");
    }
  };

  const handlePrev = () => {
    navigate("/"); 
  };

  return (
    <Card>
      <Heading text="Address Information" />
      <Form>
        <label htmlFor="address1" className="text-sm md:text-base lg:text-lg">Address Line 1</label>
        <input
          type="text"
          placeholder="123-A, Housing Apartment"
          id="address1"
          name="address1"
          value={addressDetails.address1}
          onChange={handleChange}
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
        />
        {errors.address1 && <span className="text-red-500 text-sm md:text-base lg:text-lg">{errors.address1}</span>}
        <br />
        
        <label htmlFor="address2" className="text-sm md:text-base lg:text-lg">Address Line 2</label>
        <input
          type="text"
          id="address2"
          name="address2"
          value={addressDetails.address2}
          onChange={handleChange}
          placeholder="society area, near hospital"
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
        />
        <br />
        
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor="state" className="text-sm md:text-base lg:text-lg">State</label>
            <select
              id="state"
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <span className="text-red-500 text-sm md:text-base lg:text-lg">{errors.state}</span>}
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor="city" className="text-sm md:text-base lg:text-lg">City</label>
            <select
              id="city"
              name="city"
              value={addressDetails.city}
              onChange={handleChange}
              className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <span className="text-red-500 text-sm md:text-base lg:text-lg">{errors.city}</span>}
          </div>
        </div>

        <br />
        <label htmlFor="zip" className="text-sm md:text-base lg:text-lg">Zip Code</label>
        <input
          type="text"
          placeholder="123456"
          id="zip"
          name="zip"
          value={addressDetails.zip}
          onChange={handleChange}
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
        />
        {errors.zip && <span className="text-red-500 text-sm md:text-base lg:text-lg">{errors.zip}</span>}
        <br />

        <div className="gap-2 md:gap-4 flex flex-col md:flex-row">
          <button
            onClick={handlePrev}
            type="button"
            className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 w-full md:w-1/2 text-sm md:text-base lg:text-lg transition-all ease-in-out delay-75 hover:bg-purple-300 shadow-xl hover:border-purple-400 hover:shadow-md"
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

export default Address;
