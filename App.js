import {useEffect,useState} from "react"
import './App.css';
import Axios  from "axios"
function App() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const[email,setEmail]=useState("");
  const[phno,setPhno]=useState("");
  const[salary,setSalary]=useState("");
  const[emgph,setEmgph]=useState("");
  const [updated, setUpdated] = useState({id:"",name:""});
  
  useEffect(()=>{
    loadData();
  },[]);
  //get user  api
  const loadData=async()=>{
    const response = await Axios.get('http://localhost:3003/users');
    console.log(response.data);
    setUsers(response.data)

  }
  //add user
  const AddUser =(e)=>{
    e.preventDefault();
    Axios.post('http://localhost:3003/users',{
      id,name,email,phno,salary,emgph
    }).then(()=>{
      setId("");setName("");setEmail("");setEmgph("");setPhno("");setSalary("");
    }).catch((err)=>{
      console.log(err);
    })
    setTimeout(()=>{
      loadData();
    },500)
  }
  //delete user
  const deleteUser=(id) =>{
    Axios.delete(`http://localhost:3003/users/${id}`);
    setTimeout(()=>{
      loadData();
    },500)
      
  }
  //update user
  const updateUser =()=>{
    Axios.put(`http://localhost:3003/users/${updated.id}`,{
      id:updated.id,name:updated.name,email:updated.email,salary:updated.salary,phno:updated.phno,emgph:updated.emgph
    }).then((response)=>{
      console.log(response)

    }).catch((e)=>{console.log(e)})
    setTimeout(()=>{
      loadData();
    },500)
    
  }
  //submit
  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <div className="App">
      <input placeholder="Enter Id "   value={id} onChange={e => setId(e.target.value)} required/>
      <input placeholder="Enter name " pattern="[A-Za-z]+" value={name} onChange={e => setName(e.target.value)} required/>
      <input placeholder="phonenumber" value={phno} pattern="[6789][0-9]{9}" min="1"  onChange={e => setPhno(e.target.value)} required/>
			<input placeholder="salary" value={salary} pattern="[0-9]" min="1"  onChange={e => setSalary(e.target.value)} required/>	
			<input value={email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"onChange={e => setEmail(e.target.value)} type="email" placeholder="email" required/>
      <input placeholder="emergencycontact" value={emgph} pattern="[6789][0-9]{9}" min="1"  onChange={e => setEmgph(e.target.value)} required/>
      <button onClick={AddUser}>Add</button>
      <button onClick={handleSubmit}>Submit</button>

     {users.map(e=>(
      <div key={e.id} className="container">
        <div className="container-sub">
        {e.id}{e.name}{e.email}{e.salary}{e.phno}{e.emgph}
        <button onClick={()=>{deleteUser(e.id)}}>DELETE</button>
        </div>
        <div>
      <input type="text" placeholder="enter update id" onChange={e=> setUpdated({...updated,id:e.target.value})} />
      <input type="text" placeholder="enter update name" onChange={e=> setUpdated({...updated,name:e.target.value})} />
      <input type="text" placeholder="enter update email" onChange={e=> setUpdated({...updated,email:e.target.value})} />
      <input type="text" placeholder="enter update salary" onChange={e=> setUpdated({...updated,salary:e.target.value})} />
      <input type="text" placeholder="enter update phno" onChange={e=> setUpdated({...updated,phno:e.target.value})} />
      <input type="text" placeholder="enter update emgph" onChange={e=> setUpdated({...updated,emgph:e.target.value})} />
      <button onClick={updateUser}>update</button>
        </div>
        </div>
     ))}
    </div>
  );
}

export default App;
