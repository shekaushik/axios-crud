import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css';

const API_URL = "https://api.thomso.in/apiV1/assignment";
const Update = () => {

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [selectId, setSelectedId ] = useState(null);
  const [inputDisplay, setInputDisplay] = useState('none');

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setData(response.data);
    });
  }, []);

  const Submit = () =>{
  const newData = { name, email, contact };
  if(selectId) {
      axios.put(`${API_URL}/${selectId}`, newData).then(() => {
      const nextData = data.map((item) =>
        item.id === selectId ? { ...item, ...newData } : item
      );
      setData(nextData);
      setSelectedId(null);
      setEmail("");
      setName("");
      setContact("");
    });
  }
   else{
    axios.post(API_URL, newData).then((response) => {
      setData([...data, response.data]);
      setInputDisplay('none');
      setEmail("");
      setName("");
      setContact("");
    });
  }
};

  const opEdit = (id) => {
    setSelectedId(id);
    setInputDisplay('block')
    const existingData = data.find((item) => item.id === id);
  setName(existingData.name);
  setEmail(existingData.email);
  setContact(existingData.contact);

  };

  const opDelete = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    });
  };

  const display =() => {
    setInputDisplay('block');
  }
  const nodisplay =() => {
    setInputDisplay('none');
  }

  return (
    <div>
      <h1>Employee Management Software</h1>
      <button id='employee' onClick={display}> Add Employee</button>
      <form className='input' style={{display:inputDisplay }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button type="button" onClick={Submit}>
          Submit
        </button>
        <button onClick={nodisplay}>Cancel</button>
        </form>
      <table>
        <tr className='row'>
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
        {data.map((item) => (
          <tr key={item.id} className='row'>
            <td >{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.contact}</td>
            <button type="button" onClick={() => opEdit(item.id)}>
              Edit
            </button>
            <button type="button" onClick={() => opDelete(item.id)}>
              Delete
            </button>
          </tr>
        ))}
      </table>
    </div>
      );
}

export default Update;
