import React, { useState, useEffect } from "react";
import "./administrators.css";


const Administrators = () => {
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = React.useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
  });

  
  useEffect(() => {
    fetch("  http://34.231.234.91/api/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(
          data.map((role) => {
            return <option key={role.id}>{role.name}</option>;
          })
        );
      });
  }, []);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function saveForm() {
   

    if (formData.password != formData.passwordConfirm) {
      console.log("passCode does not match");
    } else {
      console.log(formData);
    }
  }

  return (
    <div className="countryPartners-container">
      <h2>Add User</h2>

      <ul className="users">
        <li className="user-item">User 1</li>
        <li className="user-item">user 2</li>
        <li className="user-item">User 3</li>
        <li className="user-item">User 4</li>
        <li className="user-item">User 5</li>
      </ul>

      <form className="form-container">
        <div className="coulmn">
          <div className="input-item">
            <label htmlFor="fullName" className="form-label">
              Full Name<span className="star-color">*</span>
            </label>
            <input
              type="text"
              className="input-box"
              onChange={handleChange}
              id="fullName"
              value={formData.fullName}
              placeholder="Enter Full Name"
              name="fullName"
              required
            />
          </div>
          <div className="input-item">
            <label htmlFor="userName" className="form-label">
              Username<span className="star-color">*</span>
            </label>
            <input
              type="text"
              className="input-box"
              onChange={handleChange}
              id="userName"
              value={formData.userName}
              placeholder="Enter Username"
              name="userName"
            />
          </div>

          <div className="input-item">
            <label htmlFor="Password" className="form-label">
              Password<span className="star-color">*</span>
            </label>
            <input
              type="password"
              className="input-box"
              onChange={handleChange}
              id="password"
              value={formData.password}
              placeholder="Enter Password"
              name="password"
            />
          </div>
        </div>
        {/* left side */}
        <div className="coulmn">
          <div className="input-item">
            <label htmlFor="role" className="form-label">
              Role<span className="star-color">*</span>
            </label>
            <select
              name="role"
              id="role"
              className="input-box"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">--Select Role--</option>
              {roles}
            </select>
          </div>

          <div className="input-item">
            <label htmlFor="email" className="form-label">
              Email<span className="star-color">*</span>
            </label>
            <input
              type="text"
              className="input-box"
              onChange={handleChange}
              id="userName"
              value={formData.email}
              placeholder="Enter Email"
              name="email"
            />
          </div>

          <div className="input-item">
            <label htmlFor="ConfirmPassword" className="form-label">
              Confirm Password<span className="star-color">*</span>
            </label>
            <input
              type="password"
              className="input-box"
              onChange={handleChange}
              id="password"
              value={formData.passwordConfirm}
              placeholder="Confirm Password"
              name="passwordConfirm"
            />
          </div>
        </div>
        {/* right side */}
      </form>

      <div className="btn-container">
        <button className="add-btn">
        <span className="btn-icon">   <i className='fas fa-plus'></i> </span>Add another user
        </button>
        <button  onClick={saveForm} className="save-btn">
        
         <span className="btn-icon"><i className="fa-solid fa-floppy-disk me-3"></i></span> 
           Save</button>
      </div>
    </div>
  );
};

export default Administrators;
