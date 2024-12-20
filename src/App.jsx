import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import EditUser from "./EditUser";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpData, setPopUpData] = useState({});

  const [users, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [formError, setFormError] = useState({});

  console.log(formError)

  const editHandler = (data) => {
    setPopUpData(data);
    setIsOpen(true);
  };

  const getUser = async () => {
    try {
      let response = await axios.get("https://crud-api-by-malviyarohittttt.onrender.com/api/users/getUser");
      if (response.data.status) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const addUser = async (event) => {
    event.preventDefault();
    let isValid = validateForm();
    if (isValid) {
      try {
        let response = await axios.post(
          "https://crud-api-by-malviyarohittttt.onrender.com/api/users/addUser",
          {
            name,
            email,
            mobileNumber,
            age,
          }
        );
        if (response.data.status) {
          toast.success(response.data.msg);
          getUser();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const deleteUser = async (id) => {
      try {
        let response = await axios.delete(
          `https://crud-api-by-malviyarohittttt.onrender.com/api/users/deleteUser/${id}`
        );
        if (response.data.status) {
          toast.success(response.data.msg);
          getUser();
        }
      } catch (error) {
        console.log(error.message);
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
    if(mobileNumber.length!=10){
      errors.mobileNumber = "Please Enter Valid Mobile Number";
    }
    if(mobileNumber[0]!=9 && mobileNumber[0]!=8 && mobileNumber[0]!=7 && mobileNumber[0]!=6){
      errors.mobileNumber = "Please Enter Valid Mobile Number";
    }

    if (age.length == "") {
      errors.age = "Please Enter Age";
    }
    setFormError(errors);
    return Object.keys(errors).length == 0 ? true : false;
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <h1 className="text-center">User Management</h1>
        <form onSubmit={addUser}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
              <small className="text-danger"><b>{formError.name}</b></small>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <small className="text-danger"><b>{formError.email}</b></small>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputMobileNummber">Mobile Number</label>
              <input
                type="number"
                className="form-control"
                id="inputMobileNummber"
                placeholder="Enter Mobile Number"
                minLength={10}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <small className="text-danger"><b>{formError.mobileNumber}</b></small>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputAge">Age</label>
              <input
                type="number"
                className="form-control"
                id="inputAge"
                placeholder="Enter Age"
                onChange={(e) => setAge(e.target.value)}
              />
              <small className="text-danger"><b>{formError.age}</b></small>
            </div>
            <h1 className="text-center">
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </h1>
          </div>
        </form>
        <hr style={{ borderTop: "1px solid #000" }} />
        <div className="content">
          {users.length == 0 ? (
            <h1 className="text-center">No User Found</h1>
          ) : (
            <>
              <h2 className="text-center">All Users</h2>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>MobileNumber</th>
                      <th>Age</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobileNumber}</td>
                        <td>{user.age}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => editHandler(user)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      {/* PopUp Container */}
      {isOpen && (
        <EditUser
          getUser={getUser}
          setIsOpen={setIsOpen}
          popUpData={popUpData}
        />
      )}
    </>
  );
}

export default App;
