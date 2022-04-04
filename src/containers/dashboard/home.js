import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers,sideNavAction } from "../../actions/index";
import { API_ERROR, FETCH_API_DATA } from "../../actions/types";
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => 
{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiReducer.data);
  const dataType = useSelector(state => state.apiReducer.type);
  const apiLoading = useSelector(state => state.apiReducer.isLoadingData);
  const error = useSelector(state => state.apiReducer.error);
  const token = useSelector(state => state.tokenReducer.access_token);

  const [isLoaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({message:'', title:'', type:''});

  const handleClickOpen = () => {
      setOpen(true);
    };
  
  const handleClose = () => {
      setOpen(false);

      if(dialogMessage.message === 'Not Authorized, token failed.') {
        navigate('/login');
      }
  };

  useEffect(() => {
    if (!isLoaded) {
      console.log('initial loading ' + token);
      dispatch(sideNavAction({'status':'open', 'page':'loaded'}));
      setLoaded(!isLoaded);
      dispatch(getUsers(token));
    }

    if (apiLoading !== false && dataType === FETCH_API_DATA && data !== undefined) {
      console.log('loaded list ' + data.data);
      // navigate("/home");
    }

    if (apiLoading !== false && !open && error !== undefined && data === undefined && dataType === API_ERROR) {
      setDialogMessage({title: 'Invalid', message: (error.message !== undefined ? error.message : error.error)});
      handleClickOpen()
    }
  }, [isLoaded, apiLoading, dataType, data, open, error, token, dispatch]);

  return(
    <>
        <Container>
        <Row className="justify-content-md-center" >
            <Col sm>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/goo_hara_nstul2/k-pop-star-goo-hara-found-dead-at-28.jpg" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary" onClick={() => {
                        setDialogMessage({title: 'Invalid', message: 'Bootstrap error dialog sample'});
                        handleClickOpen()
                    }}>Go somewhere</Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm> 
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/goo_hara_nstul2/k-pop-star-goo-hara-found-dead-at-28.jpg" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>
            </Col>
            <Col sm>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/goo_hara_nstul2/k-pop-star-goo-hara-found-dead-at-28.jpg" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card>
            </Col>
        </Row>
        </Container>

      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: 100001 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{dialogMessage.title !== '' ? dialogMessage.title : 'Invalid'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {dialogMessage.message !== '' ? dialogMessage.message : 'Something went wrong.'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home;