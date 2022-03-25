import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { useNavigate } from 'react-router-dom';

export const UserList = ({ data }) => {
    const navigate = useNavigate();
    try {
        return (<ul>
            {
                data !== undefined ? data.map(item => 
                    // Object.keys(item).map((key,index) => 
                    //     // <p>{item[key]}</p>
                    // )
                    <Card
                        key={item["id"]}
                        style={{
                        width: 400,
                        backgroundColor: item['status'] === 'active' ? "yellow" : "gray",
                        marginTop: 25
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {item["name"]}
                            </Typography>
                            <Typography
                                color="textSecondary"
                            >
                                {item["email"]}
                            </Typography>
                            <Typography
                                style={{
                                marginBottom: 12,
                                }}
                                color="textSecondary"
                            >
                                Gender: {item["gender"]}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {
                                navigate("/user/"+item["id"]);
                                }} >View Details</Button>
                        </CardActions>
                    </Card>
                ) : ''
            }
        </ul>)
  } catch (error) {
    return ( <div> </div> );
  }
}