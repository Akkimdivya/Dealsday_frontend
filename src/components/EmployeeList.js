import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const EmployeeList = () => {
  const [infoFromDB, setInfoFromDB] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://dealday.onrender.com/employee-list");
      setInfoFromDB(response.data);
    } catch (error) {
      console.log("error from EmployeeList useEffect");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://dealday.onrender.com/employee-list/${id}`);
      fetchData();  // Re-fetch data after deletion
    } catch (error) {
      console.log("Error deleting user");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = infoFromDB.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="w-full px-4">
      <p className="text-center text-xl font-semibold my-4">
        Total Count: {filteredEmployees.length}
      </p>
      <Button variant="text"><Link to='/create-employee'>Create Employee</Link></Button>
      <input
        type="text"
        placeholder="Search by name, email, designation"
        value={searchQuery}
        onChange={handleSearchChange}
        className="inp-wi p-2 mx-5 m-2 border rounded"
      />
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-400">Unique Id</th>
              <th className="px-4 py-2 border border-gray-400">Image</th>
              <th className="px-4 py-2 border border-gray-400">Name</th>
              <th className="px-4 py-2 border border-gray-400">Email</th>
              <th className="px-4 py-2 border border-gray-400">Phone</th>
              <th className="px-4 py-2 border border-gray-400">Designation</th>
              <th className="px-4 py-2 border border-gray-400">Gender</th>
              <th className="px-4 py-2 border border-gray-400">Course</th>
              <th className="px-4 py-2 border border-gray-400">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentEmployees.map((item, i) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-2 border border-gray-400">{i + 1 + indexOfFirstItem}</td>
                <td className="px-4 py-2 border border-gray-400">
                  <img
                    src={item.image}
                    alt="employee"
                    className=" object-cover mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {item.name}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {item.email}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {item.phone}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {item.designation}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {item.gender}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {item.course.join(", ")}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  <Link
                    to={`/edit-employee/${item._id}`}
                    className="mr-2 text-blue-500"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteUser(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          {Array.from({ length: Math.ceil(filteredEmployees.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-black"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
