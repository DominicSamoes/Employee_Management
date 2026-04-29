import React, { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const EmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  const saveEmployee = (e) => {
    e.preventDefault();

    console.log(JSON.stringify(employee));

    createEmployee(employee)
      .then((response) => {
        console.log("Employee created successfully:", response.data);

        navigate("/employees");
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Add Employee</h2>
          <div className="card-body">
            <form onSubmit={saveEmployee}>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  className="form-control"
                  value={employee.firstName}
                  onChange={(e) =>
                    setEmployee({ ...employee, firstName: e.target.value })
                  }
                />
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  className="form-control"
                  value={employee.lastName}
                  onChange={(e) =>
                    setEmployee({ ...employee, lastName: e.target.value })
                  }
                />
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  className="form-control"
                  value={employee.email}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </div>

              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
