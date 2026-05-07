import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
  });

  const [editingId, setEditingId] = useState(null);

  // GET USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // UPDATE
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/users/${editingId}`,
          formData
        );

        setEditingId(null);
      }
      // CREATE
      else {
        await axios.post("http://localhost:5000/api/users", formData);
      }

      setFormData({
        name: "",
        age: "",
        city: "",
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT USER
  const editUser = (user) => {
    setFormData({
      name: user.name,
      age: user.age,
      city: user.city,
    });

    setEditingId(user._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          MERN CRUD App
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg w-full"
          >
            {editingId ? "Update User" : "Add User"}
          </button>
        </form>

        {/* USER LIST */}
        <div className="mt-8 space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p>Age: {user.age}</p>
                <p>City: {user.city}</p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => editUser(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;