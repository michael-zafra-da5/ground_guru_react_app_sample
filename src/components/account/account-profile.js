import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

export const AccountProfile = ({ props, data, handleOpen }) => {

  function isValidURL(string) {
    //eslint-disable-next-line
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

return(
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={data.avatar !== undefined ? (isValidURL(data.avatar) ? data.avatar : `data:image/jpeg;base64,${data.avatar}`) : ''}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {data.first_name + ' ' + data.last_name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {data.email}
        </Typography>
        {/* <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.timezone}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
        onClick={handleOpen}
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
)};