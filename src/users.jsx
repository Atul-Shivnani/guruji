import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/card";
import Heading from "./components/heading";
import { useNavigate, Link } from "react-router-dom"; // Ensure Link is imported from react-router-dom

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Rename to plural for clarity

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data); // Set the response data to the state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the async function
  }, []);

  const handleClick=()=>{
    localStorage.removeItem("data");
    navigate("/step1")
  }

  return (
    <Card>
      <div className="flex justify-between w-full">
        <Heading text={"User Management"} />
        <button
          type="button"
          onClick={handleClick}
          className="bg-purple-200 p-2 rounded-xl border-2 border-purple-300 text-sm md:text-base lg:text-lg hover:bg-purple-300 shadow-xl hover:border-purple-400 transition-all ease-in-out delay-75 hover:shadow-md"
        >
          {"Create User"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user, index) => (
              <tr key={user.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="py-2 px-4 border-b">{user.id || ''}</td>
                <td className="py-2 px-4 border-b">{user.name || ''}</td>
                <td className="py-2 px-4 border-b">{user.email || ''}</td>
                <td className="py-2 px-4 border-b">{user.phone || ''}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/profile/${user.id || ''}`} className="text-blue-500 hover:underline">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Users;
