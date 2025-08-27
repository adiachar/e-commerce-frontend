import {useState, useEffect} from "react";
import axios, {type AxiosResponse} from "axios";
import './App.css';

function App() {

  const [user, setUser] = useState<{name: String, email: String} | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get("http://localhost:5000/user");
        if(response.status == 200) {
          setUser(response.data.user);
        }
        
      } catch(err) {
        console.log(err);
      }
    }

    getUser();
  });

  return (
    <>
      <div>
        <h1>{user?.name}</h1>
      </div>
    </>
  )
}

export default App
