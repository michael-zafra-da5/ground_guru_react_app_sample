import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUsers } from "../actions/index";
import { UserList } from '../components/UserList'
import { BarLoader } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import { useForm } from 'react-hook-form';
import { FETCH_API_DATA } from "../actions/types";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiReducer.data);
  const dataType = useSelector(state => state.apiReducer.type);
  const apiLoading = useSelector(state => state.apiReducer.isLoadingData);

  const { register, handleSubmit, formState : { errors } } = useForm();
  const onSubmit = data => dispatch(createUser(data)); 

  return (
    <div className="App">
      <header className="App-header">
        { apiLoading === true ? 
          <BarLoader text={"Loading..."} center={false} width={"150px"} height={"150px"}/> 
        : 
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                  Name:
                <input defaultValue="" {...register("name", { required: true })}/>
              </label>
              {errors.name && <span>This field is required</span>}

              <label>
                  Email:
                <input defaultValue="" {...register("email", { required: true })}/>
              </label>
              {errors.email && <span>This field is required</span>}

              <label>
                  Gender:
                <input defaultValue="male" {...register("gender", { required: true })}/>
              </label>
              {errors.gender && <span>This field is required</span>}

              <label>
                  Status:
                <input defaultValue="active" {...register("status", { required: true })}/>
              </label>
              {errors.status && <span>This field is required</span>}

              <input type="submit" />
            </form>

            <button onClick={() => dispatch(fetchUsers())}>Refresh User List</button>
            {data !== undefined && dataType === FETCH_API_DATA ? <UserList data={data}></UserList> : ''}
          </div>
        }
      </header>
      

    </div>
  );
}

export default App;
