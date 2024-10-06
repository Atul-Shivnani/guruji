import { useEffect, useState } from 'react';
import Card from './components/card';
import Heading from './components/heading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Confirmation = () => {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addressDetails, setAddressDetails] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || {};
    if (!storedData.personal) {
      navigate("/");
      alert("Please fill all the details first");
    } else if (!storedData.address) {
      navigate("/step2");
      alert("Please fill all the details first");
    } else {
      setPersonalDetails(storedData.personal);
      setAddressDetails(storedData.address);
    }
  }, []);

  const handlePrev = () => {
    navigate("/step2");
  };

  const handleSubmit = async () => {
const res = await axios.post("http://localhost:3001/submission",{
  userData: personalDetails,
  addressData: addressDetails
})
localStorage.removeItem("data");
navigate(`/success?state=${res.data.state}&msg=${res.data.msg}`)
  }

  return (
    <Card>
      <Heading text="Confirmation" />
      <div className="flex flex-col gap-4 w-full px-4 md:px-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold underline">Personal Information</h2>
          <p><strong>Name:</strong> {personalDetails.name}</p>
          <p><strong>Email:</strong> {personalDetails.email}</p>
          <p><strong>Phone:</strong> {personalDetails.phone}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold underline">Address Information</h2>
          <p><strong>Address Line 1:</strong> {addressDetails.address1}</p>
          <p><strong>Address Line 2:</strong> {addressDetails.address2}</p>
          <p><strong>City:</strong> {addressDetails.city}</p>
          <p><strong>State:</strong> {addressDetails.state}</p>
          <p><strong>ZIP Code:</strong> {addressDetails.zip}</p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <button
            onClick={handlePrev}
            type="button"
            className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 w-full md:w-1/2 transition-all ease-in-out delay-75 hover:bg-purple-300 shadow-xl hover:border-purple-400 hover:shadow-md"
          >
            {"<Prev"}
          </button>
          <button
          onClick={handleSubmit}
            type="button"
            className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 w-full md:w-1/2 transition-all ease-in-out delay-75 hover:bg-purple-300 shadow-xl hover:border-purple-400 hover:shadow-md"
          >
            {"Submit"}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Confirmation;
