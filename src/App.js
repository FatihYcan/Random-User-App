// App.js

import { Button, Container, Table } from "react-bootstrap";
import logo from "./assets/img/logo.jpg";
import {
  FcBusinessman,
  FcBusinesswoman,
  FcComments,
  FcHome,
  FcLock,
  FcPhone,
  FcPlanner,
} from "react-icons/fc";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function App() {
  const [users, setUsers] = useState({
    picture: "",
    name: "",
    email: "",
    dob: "",
    location: "",
    phone: "",
    login: "",
  });

  const [visible, setVisible] = useState({
    nameVisible: true,
    emailVisible: false,
    dobVisible: false,
    locationVisible: false,
    phoneVisible: false,
    loginVisible: false,
  });

  const [user, setUser] = useState([]);

  const url = "https://randomuser.me/api";

  const getUser = () => {
    axios(url)
      .then((res) => setUsers(res.data.results[0]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleClick = () => {
    if (user.some((i) => i.userEmail === users.email)) {
      Swal.fire({
        text: "This user has been added before.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      setUser([
        ...user,
        {
          userName: name,
          userEmail: email,
          userPhone: phone,
          userDob: dob,
        },
      ]);
    }
  };

  const { picture, name, email, dob, location, phone, login, gender } = users;

  const headers = ["First Name", "Email", "Phone", "Age"];

  return (
    <>
      <header className="text-center p-4">
        <img src={logo} alt={logo} width="75px" />
      </header>
      <Container className="text-center my-4 py-4">
        <img
          src={picture.large}
          alt={picture.large}
          className="mb-3 rounded-circle img-thumbnail"
        />

        {visible.nameVisible && (
          <>
            <p className="mb-0">My name is</p>
            <h4>
              {name.title} {name.first} {name.last}
            </h4>
          </>
        )}

        {visible.emailVisible && (
          <>
            <p className="mb-0">My email is</p>
            <h4>{email}</h4>
          </>
        )}

        {visible.dobVisible && (
          <>
            <p className="mb-0">My age is</p>
            <h4>{dob.age}</h4>
          </>
        )}

        {visible.locationVisible && (
          <>
            <p className="mb-0">My street is</p>
            <h4>
              {location.city} / {location.state} / {location.country}
            </h4>
          </>
        )}

        {visible.phoneVisible && (
          <>
            <p className="mb-0"> My phone is is</p>
            <h4>{phone}</h4>
          </>
        )}

        {visible.loginVisible && (
          <>
            <p className="mb-0"> My password is is</p>
            <h4>{login.password}</h4>
          </>
        )}

        <div className="icons d-flex justify-content-around mt-2 p-3  ">
          {gender === "male" ? (
            <FcBusinessman
              type="button"
              className="icon"
              onMouseOver={() => setVisible({ nameVisible: true })}
            />
          ) : (
            <FcBusinesswoman
              type="button"
              className="icon"
              onMouseOver={() => setVisible({ nameVisible: true })}
            />
          )}

          <FcComments
            type="button"
            className="icon"
            onMouseOver={() => setVisible({ emailVisible: true })}
          />
          <FcPlanner
            type="button"
            className="icon"
            onMouseOver={() => setVisible({ dobVisible: true })}
          />
          <FcHome
            type="button"
            className="icon"
            onMouseOver={() => setVisible({ locationVisible: true })}
          />
          <FcPhone
            type="button"
            className="icon"
            onMouseOver={() => setVisible({ phoneVisible: true })}
          />
          <FcLock
            type="button"
            className="icon"
            onMouseOver={() => setVisible({ loginVisible: true })}
          />
        </div>

        <div className="butons d-flex justify-content-around mt-3 mb-5">
          <Button
            variant="success"
            className="px-4 rounded-3"
            onClick={getUser}
          >
            New User
          </Button>
          <Button
            variant="primary"
            className="px-4 rounded-3"
            onClick={handleClick}
          >
            Add User
          </Button>
        </div>

        <Table responsive>
          <thead>
            <tr className="table-title">
              {Array.from(headers).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(user).map((item, i) => (
              <tr key={i}>
                <td>
                  {item.userName.title} {item.userName.first}{" "}
                  {item.userName.last}
                </td>
                <td>{item.userEmail}</td>
                <td>{item.userPhone}</td>
                <td>{item.userDob.age}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default App;
