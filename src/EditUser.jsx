/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditUser({ getUser, setIsOpen, popUpData }) {
  const [name, setName] = useState(popUpData.name);
  const [email, setEmail] = useState(popUpData.email);
  const [mobileNumber, setMobileNumber] = useState(popUpData.mobileNumber);
  const [age, setAge] = useState(popUpData.age);
  const [id, setId] = useState(popUpData._id);
  const [formError, setFormError] = useState({});

  const editUser = async (event) => {
    event.preventDefault();
    let isValid = validateForm();
    if (isValid) {
      try {
        let response = await axios.put(
          "https://crud-api-by-malviyarohittttt.onrender.com/api/users/editUser",
          { name, email, mobileNumber, age, id }
        );
        if (response.data.status) {
          toast.success(response.data.msg);
          setIsOpen(false);
          getUser();
        } else {
          alert(response.data.msg);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (name.length == "") {
      errors.name = "Please Enter Name";
    }
    if (email.length == "") {
      errors.email = "Please Enter Email";
    }
    if (mobileNumber.length == "") {
      errors.mobileNumber = "Please Enter Mobile Number";
    }
    if (age.length == "") {
      errors.age = "Please Enter Age";
    }
    setFormError(errors);
    return Object.keys(errors).length == 0 ? true : false;
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <>
      <div className="wrapper-container"></div>
      <div className="content-container">
        <h3 className="text-center mb-4">Edit User Details</h3>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <small className="text-danger">
                <b>{formError.name}</b>
              </small>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small className="text-danger">
                <b>{formError.email}</b>
              </small>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="number"
              className="form-control"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <small className="text-danger">
              <b>{formError.mobileNumber}</b>
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="inputAge">Age</label>
            <input
              type="number"
              className="form-control"
              id="inputAge"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <small className="text-danger">
              <b>{formError.age}</b>
            </small>
          </div>
          <button onClick={editUser} type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
        <button
          className="close-btn btn btn-primary"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
}

export default EditUser;
