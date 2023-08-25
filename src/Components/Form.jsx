import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hobby, setHobby] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleHobbyChange = (e) => {
    setHobby(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name == "" || email == "" || phone == "" || hobby == "") {
      alert("Complete the credentials");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/submitForm", {
        username: name,
        email: email,
        phone: phone,
        hobby: hobby,
      });

      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="form_input">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={handlePhoneChange}
        />

        <textarea
          name="Hobbies"
          placeholder="Your Hobbies"
          value={hobby}
          onChange={handleHobbyChange}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Form;
