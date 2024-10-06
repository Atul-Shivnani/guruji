import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./components/card";
import Form from "./components/form";
import Heading from "./components/heading";
import { personalSchema, addressSchema } from "./zodSchemas/schemas";
import { State, City } from "country-state-city";

const Profile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState({
    id:"",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [userErrors, setUserErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});

  const userId = pathname.split("/").pop();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}`);
        const userData = response.data;

        setUser({
          id: userData.id || "",
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });

        if (userData.address) {
          setAddress({
            id:userData.address[0].id || "",
            address1: userData.address[0].address1 || "",
            address2: userData.address[0].address2 || "",
            city: userData.address[0].city || "",
            state: userData.address[0].state || "",
            zip: userData.address[0].zip || "",
          });

          const stateObj = State.getStatesOfCountry("IN").find(
            state => state.name === userData.address[0].state
          );
          if (stateObj) {
            setSelectedState(stateObj.isoCode);
            setCities(City.getCitiesOfState("IN", stateObj.isoCode));
          }
        }

        setStates(State.getStatesOfCountry("IN"));
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/404");
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
    // Clear the error for this field when it's changed
    setUserErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value,
    }));
    // Clear the error for this field when it's changed
    setAddressErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const stateName = states.find((state) => state.isoCode === stateCode)?.name || "";

    setSelectedState(stateCode);
    setCities(City.getCitiesOfState("IN", stateCode));

    setAddress(prev => ({
      ...prev,
      state: stateName,
      city: "", // Reset city when state changes
    }));

    // Clear the error for state and city when state is changed
    setAddressErrors(prevErrors => ({
      ...prevErrors,
      state: undefined,
      city: undefined,
    }));
  };

 

  const handleDelete = async () => {
    const res = await axios.delete(`http://localhost:3001/delete/${userId}`,{
    });
    navigate(`/success?state=${res.data.state}&msg=${res.data.msg}`);
  };

  const handleEdit = async () => {
    const userDataResult = personalSchema.safeParse(user);
    const addressDataResult = addressSchema.safeParse(address);
  
    // Handle user errors
    const newUserErrors = userDataResult.success ? {} : 
      userDataResult.error.errors.reduce((acc, err) => ({
        ...acc,
        [err.path[0]]: err.message,
      }), {});
    setUserErrors(newUserErrors);
  
    // Handle address errors
    const newAddressErrors = addressDataResult.success ? {} : 
      addressDataResult.error.errors.reduce((acc, err) => ({
        ...acc,
        [err.path[0]]: err.message,
      }), {});
    setAddressErrors(newAddressErrors);
  
    // Proceed only if both validations succeed
    if (userDataResult.success && addressDataResult.success) {
      try {
        console.log("userId: "+user.id + "userData: "+user+"address: "+address)
        const res = await axios.put(`http://localhost:3001/user/${user.id}`, {
          userData: user,
          addressData: address,
        });
        navigate(`/success?state=${res.data.state}&msg=${res.data.msg}`);
      } catch (error) {
        console.error("Error updating user:", error);
        // Handle error (e.g., set an error message state)
      }
    }
  };
  

  return (
    <Card>
      <Heading text="Edit Profile" />
      <Form onSubmit={handleEdit}>
        <label htmlFor="name" className="text-sm md:text-base lg:text-lg">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleUserChange}
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
          placeholder="John Doe"
        />
        {userErrors.name && <span className="text-red-500">{userErrors.name}</span>}

        <label htmlFor="email" className="text-sm md:text-base lg:text-lg">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleUserChange}
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
          placeholder="john@example.com"
        />
       {userErrors.email && <span className="text-red-500">{userErrors.email}</span>}

        <label htmlFor="phone" className="text-sm md:text-base lg:text-lg">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={user.phone}
          onChange={handleUserChange}
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
          placeholder="1234567890"
        />
        {userErrors.phone && <span className="text-red-500">{userErrors.phone}</span>}

        <label htmlFor="address1" className="text-sm md:text-base lg:text-lg">Address Line 1</label>
        <input
          type="text"
          id="address1"
          name="address1"
          value={address.address1}
          onChange={handleAddressChange}
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
          placeholder="123-A, Housing Apartment"
        />
        {addressErrors.address1 && <span className="text-red-500">{addressErrors.address1}</span>}

        <label htmlFor="address2" className="text-sm md:text-base lg:text-lg">Address Line 2</label>
        <input
          type="text"
          id="address2"
          name="address2"
          value={address.address2}
          onChange={handleAddressChange}
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
          placeholder="Society area, near hospital"
        />

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
              <option value="">{address.state}</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
            {addressErrors.state && <span className="text-red-500">{addressErrors.state}</span>}

          </div>

          <div className="flex flex-col w-full md:w-1/2">
            <label htmlFor="city" className="text-sm md:text-base lg:text-lg">City</label>
            <select
              id="city"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
            >
              <option value="">{address.city}</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {addressErrors.city && <span className="text-red-500">{addressErrors.city}</span>}
          </div>
        </div>

        <label htmlFor="zip" className="text-sm md:text-base lg:text-lg">Zip Code</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={address.zip}
          onChange={handleAddressChange}
          className="bg-transparent border-2 p-2 border-purple-300 text-sm md:text-base lg:text-lg"
          placeholder="123456"
        />
       {addressErrors.zip && <span className="text-red-500">{addressErrors.zip}</span>}

        <div className="gap-2 md:gap-4 flex flex-col md:flex-row mt-4">
          <button
            type="button"
            onClick={handleEdit}
            className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 w-full md:w-1/2 text-sm md:text-base lg:text-lg transition-all ease-in-out delay-75 hover:bg-purple-300 shadow-xl hover:border-purple-400 hover:shadow-md"
          >
            Save Changes
          </button>
          <button
            onClick={handleDelete}
            type="button"
            className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 w-full md:w-1/2 text-sm md:text-base lg:text-lg hover:bg-purple-300 shadow-xl hover:border-purple-400 transition-all ease-in-out delay-75 hover:shadow-md"
          >
            Delete
          </button>
        </div>
      </Form>
    </Card>
  );
};

export default Profile;