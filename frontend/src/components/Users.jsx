import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [filter, setFilter] = useState("");
  let [users, setUsers] = useState([]);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/bulk",
          {
            headers : {
                "Authorization" : token
            },
            
            params: {
              filter: filter,
            },
          }
        );
        setUsers(response.data.friends);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

    // Since the filter value is a dependency, add it to the dependency array
  }, [filter]);
  console.log(users);
  return (
    <div>
      <div className="font-bold text-lg pl-5">Users</div>
      <InputBox
        placeholder={"Search Users..."}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      ></InputBox>
      {
        users.map((user)=>{
            return <DisplayUser user={user}></DisplayUser>

        })
      }
    </div>
  );
}

function DisplayUser({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-5 pb- items-center justify-center">
      <div className="flex items-center justify-center">
        <button className="bg-gray-300 w-10 h-10 rounded-full mr-4 font-semibold">
          U1
        </button>
        <div className="text-medium font-semibold">{user.firstname}</div>
      </div>
      <button onClick={()=>{
        navigate("/send?id="+user.id+"&name="+user.firstname);
      }} className="bg-black text-white rounded p-2 text-center">
        Send Money
      </button>
    </div>
  );
}
