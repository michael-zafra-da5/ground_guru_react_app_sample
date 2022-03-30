import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../../components/customer/customer-list-results';
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useDispatch, useSelector } from "react-redux";
// import { customers } from '../__mocks__/customers';

const Users = () => 
{
  const token = useSelector(state => state.tokenReducer.access_token);
  return(
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <p>{token}</p>
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={[]} />
        </Box>
      </Container>
    </Box>
  </>
)};
Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
