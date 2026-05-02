import React, { useState, useEffect } from "react";
import { createEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../services/EmployeeService";

const EmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => {
          console.error("Error fetching employee:", error);
        });
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log(JSON.stringify(employee));

    if (id) {
      updateEmployee(id, employee)
        .then((response) => {
          console.log("Employee updated successfully:", response.data);

          navigate("/employees");
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
      return;
    }

    createEmployee(employee)
      .then((response) => {
        console.log("Employee created successfully:", response.data);

        navigate("/employees");
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
      });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!employee.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!employee.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!employee.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">{pageTitle()}</h2>
          <div className="card-body">
            <form onSubmit={saveOrUpdateEmployee}>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  value={employee.firstName}
                  onChange={(e) =>
                    setEmployee({ ...employee, firstName: e.target.value })
                  }
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  value={employee.lastName}
                  onChange={(e) =>
                    setEmployee({ ...employee, lastName: e.target.value })
                  }
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={employee.email}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
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
