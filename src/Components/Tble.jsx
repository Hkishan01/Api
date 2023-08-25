import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
const Tble = () => {
  const form = useRef();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null); // Change setId to setEditId

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hobby, setHobby] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/getData")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const handleEdit = (id) => {
    setEditId(id); // Use setEditId to update the editId state
  };

  const handleCancelEdit = () => {
    setEditId(null); // Clear the editId to exit edit mode
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "" || hobby === "") {
      alert("Complete the credentials");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/update", {
        id, // Pass the ID of the item being updated
        username: name,
        email: email,
        phone: phone,
        hobby: hobby,
      });

      console.log(response);
      fetchData(); // Fetch data again after successful update
      setEditId(null); // Clear edit mode after successful update
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteData = (id) => {
    axios
      .post("http://localhost:5000/delete", { id })
      .then((response) => {
        console.log(response.data.message);
        fetchData(); // Fetch data again after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  function objectToFormData(obj) {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  const sendEmail = (id) => {
    // e.preventDefault();
    // console.log(id);
    // console.log(data);
    let frm;
    data.forEach((element) => {
      if (element._id === id) {
        frm = element;
        // console.log(element);
      }
    });
    console.log(frm);
    let fData = objectToFormData(frm);
    console.log(fData);
    emailjs
      .sendForm(
        "service_utfsd4e",
        "template_a0buejc",
        fData,
        "QZs-K6Ws07Gjfa_KN"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="table">
      <nav>
        <span>Home</span>
        <button onClick={() => navigate("form")}>AddData</button>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Db_Id</th>
            <th>Name</th>

            <th>Email</th>
            <th>Phone Number</th>
            <th>Hobbies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <input type="checkbox" onClick={() => sendEmail(item._id)} />
              </td>
              <td>{item._id}</td>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  item.phone
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    value={hobby}
                    onChange={(e) => setHobby(e.target.value)}
                  />
                ) : (
                  item.hobby
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <>
                    <button onClick={(e) => handleSubmit(e, item._id)}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                    <button onClick={() => deleteData(item._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tble;
