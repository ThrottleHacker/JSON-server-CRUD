import {useEffect,useState} from "react"
import './App.css';
import Axios  from "axios"
function App() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
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
      id,name
    }).then(()=>{
      setId("");setName("");
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
      id:updated.id,name:updated.name
    }).then((response)=>{
      console.log(response)

    }).catch((e)=>{console.log(e)})
    setTimeout(()=>{
      loadData();
    },500)
    
  }
  return (
    <div className="App">
      <input placeholder="Enter Id " value={id} onChange={e => setId(e.target.value)}/>
      <input placeholder="Enter Id " value={name} onChange={e => setName(e.target.value)}/>
      <button onClick={AddUser}>Add</button>

     {users.map(e=>(
      <div key={e.id} className="container">
        <div className="container-sub">
        {e.id}{e.name}<button onClick={()=>{deleteUser(e.id)}}>DELETE</button>
        </div>
        <div>
      <input type="text" placeholder="enter update id" onChange={e=> setUpdated({...updated,id:e.target.value})} />
      <input type="text" placeholder="enter update name" onChange={e=> setUpdated({...updated,name:e.target.value})} />
      <button onClick={updateUser}>update</button>
        </div>
        </div>
     ))}
    </div>
  );
}

export default App;
