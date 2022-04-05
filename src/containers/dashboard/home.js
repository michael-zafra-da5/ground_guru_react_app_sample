import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies,sideNavAction,tokenAction } from "../../actions/index";
import { API_ERROR, MOVIES_RESPONSE } from "../../actions/types";
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Modal, Carousel } from 'react-bootstrap';
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
  const [openDetails, setOpenDetails] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({message:'', title:'', type:''});

  const handleClickOpen = () => {
      setOpen(true);
    };
  
  const handleClose = () => {
      setOpen(false);

      if(dialogMessage.message === 'Not Authorized, token failed.') {
        dispatch(tokenAction(null));
        navigate('/login');
      }
  };

  function handleClickOpenDetails(item) {
    setOpenDetails(true);
    setDialogMessage({title: item.name, message: item.description, type: 'DESCRIPTION'});
    };
  
  const handleCloseDetails = () => {
      setOpenDetails(false);
  };

  useEffect(() => {
    if (!isLoaded) {
      console.log('initial loading ' + token);
      dispatch(sideNavAction({'status':'open', 'page':'loaded'}));
      setLoaded(!isLoaded);
      dispatch(getMovies(token));
    }

    if (apiLoading !== false && dataType === MOVIES_RESPONSE && data !== undefined) {
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
        <Carousel style={{ height: "20%", marginTop:20 }}>
        {data !== undefined && dataType === MOVIES_RESPONSE ? 
            data.data.map(item => 
                <Carousel.Item key={item._id}>
                <img
                className="d-block w-100"
                src={item.image}
                alt={item.name}
                style={{ height: 350, objectFit: "cover"}}
                />
                <Carousel.Caption>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
            ) : ''
        }
        </Carousel>


        <Row className="justify-content-md-center" style={{ marginTop:20 }}>
            {data !== undefined && dataType === MOVIES_RESPONSE ? 
            data.data.map(item => 
                <Col key={item._id} sm style={{ marginTop:20 }}>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}
                    </Card.Text>
                    <Button variant="primary" onClick={() => 
                        handleClickOpenDetails(item)}>View details</Button>
                </Card.Body>
                </Card>
                </Col>
            ) : ''
            }
        </Row>
        </Container>

    {/* Error dialog */}
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: 100001 }}
      >
        <Modal.Header>
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

        {/* Details dialog */}
        <Modal
        show={openDetails}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            {dialogMessage.title !== '' ? dialogMessage.title : ''}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Summary:</h4>
            <p>
            {dialogMessage.message !== '' ? dialogMessage.message : ''}
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleCloseDetails}>Close</Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default Home;