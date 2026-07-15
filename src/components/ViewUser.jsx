import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:3000/view-user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">

            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Address</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.gender}</td>
                    <td>{user.age}</td>
                    <td>{user.address}</td>
                    <td>{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
