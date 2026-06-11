import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h1>Register Page</h1>

      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;