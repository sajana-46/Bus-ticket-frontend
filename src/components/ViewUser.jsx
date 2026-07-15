import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Edit State
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .post("http://127.0.0.1:3000/view-user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .post("http://127.0.0.1:3000/delete-user", { _id: id })
        .then(() => {
          setUsers(users.filter(user => user._id !== id));
        })
        .catch(err => {
          console.error("Error deleting user:", err);
          // Fallback if backend uses DELETE method instead
          axios.delete(`http://127.0.0.1:3000/delete-user/${id}`)
            .then(() => setUsers(users.filter(user => user._id !== id)))
            .catch(e => console.error("Fallback delete failed:", e));
        });
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditFormData({ ...user });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    axios
      .post("http://127.0.0.1:3000/update-user", editFormData)
      .then(() => {
        setUsers(users.map(u => u._id === editingUserId ? editFormData : u));
        setEditingUserId(null);
      })
      .catch(err => console.error("Error updating user:", err));
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const filteredUsers = users.filter(user => {
    return (
      (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.phone && user.phone.includes(searchQuery))
    );
  });

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Manage Users</h2>
          <div className="w-25">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by name, email, or phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                  <tr key={user._id || index}>
                    <td>{index + 1}</td>
                    
                    {editingUserId === user._id ? (
                      <>
                        <td><input type="text" name="name" className="form-control form-control-sm" value={editFormData.name || ''} onChange={handleEditChange} /></td>
                        <td><input type="email" name="email" className="form-control form-control-sm" value={editFormData.email || ''} onChange={handleEditChange} /></td>
                        <td><input type="text" name="phone" className="form-control form-control-sm" value={editFormData.phone || ''} onChange={handleEditChange} /></td>
                        <td>
                          <select name="gender" className="form-select form-select-sm" value={editFormData.gender || ''} onChange={handleEditChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </td>
                        <td><input type="number" name="age" className="form-control form-control-sm" value={editFormData.age || ''} onChange={handleEditChange} /></td>
                        <td><input type="text" name="address" className="form-control form-control-sm" value={editFormData.address || ''} onChange={handleEditChange} /></td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-success me-2" onClick={handleSave}>Save</button>
                          <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.gender}</td>
                        <td>{user.age}</td>
                        <td>{user.address}</td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditClick(user)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="text-center">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
