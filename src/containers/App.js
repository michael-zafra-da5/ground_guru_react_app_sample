import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUsers } from "../actions/index";
import { UserList } from '../components/UserList'
import { BarLoader } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiReducer.data);
  const apiLoading = useSelector(state => state.apiReducer.isLoadingData);

  return (
    <div className="App">
      <header className="App-header">
        { apiLoading === true ? 
          <BarLoader text={"Loading..."} center={false} width={"150px"} height={"150px"}/> 
        : 
          <div>
            <label>
              Name:
              <input type="text" name="name" />
            </label>

            <label>
              Email:
              <input type="text" name="email" />
            </label>

            <label>
              Gender:
              <input type="text" name="gender" />
            </label>
            
            <button onClick={() => dispatch(createUser({"name":"Tenali Ramakrishna", "gender":"male", "email":"tenali.ramakrishna@15ce.com", "status":"active"}))}>Submit</button>
          

            <button onClick={() => dispatch(fetchUsers())}>List User</button>
            <UserList data={data}></UserList>
          </div>
        }


        

      </header>
      

    </div>
  );
}

export default App;
