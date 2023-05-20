import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cards from '../.././components/Card/Card';
import CardForm from '../.././components/Card/CardForm';
import {
  CreditCard,
} from '../.././components/Card/CreditCard';
import Card from 'react-bootstrap/Card';
import CreditCardBox from '../Card/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';

const initialState: CreditCard = {
  _id: '',
  cardNumber: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
};

export default function CardView() {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const [state, setState] = useState<CreditCard>(initialState);
  const [cardsData, setCardsData] = useState<CreditCard[]>([]);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const [cardsDatas, setCardsDatas] = useState<CreditCard[]>([]);


  useEffect(() => {
    const fetchCard = async () => {

    }
    fetchCard()
  }, [])


  useEffect(() => {
    fetchData();
  }, []);

  const params = useParams();
  const [posts, setPosts] =useState<any>([]);

  

  async function fetchData() {
    

  }

  async function selectCard(id: any) {

    setState(cardsDatas[id]);
    console.log(cardsDatas)

  }


  function handleSubmitAction() {

    const cardData = {
      cardNumber: state.cardNumber,
      cardHolder: state.cardHolder,
      cardMonth: state.cardMonth,
      cardYear: state.cardYear,
      cardCvv: state.cardCvv,
    };

  }
  function handleDeleteAction() {

  
  }
  const DeleteShow = () => {


  };
  const updateStateValues=()=>{}

  return (
    <>

      <div>


        <div>

          <br /><br />
          <h1 className="home-page-heading text-center">Your Cards</h1><br /><br />
          <Container>
            <Row className="d-flex justify-content-center">
              {cardsDatas.length === 0 && (
                <Card style={{ width: '50%', margin: '25px' }}>
                  <Card.Body>
                    <Card.Title>No card exist</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Go to add card for create a new card.
                    </Card.Subtitle>
                    <Card.Text>
                      You can add,edit and delete card any time..
                    </Card.Text>

                  </Card.Body>
                </Card>
              )}


              {cardsDatas.map((card: CreditCard, id) => (
                <Col md={4} key={id} className="mb-3">
                  <button type="button" onClick={() => selectCard(id)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ backgroundColor: "Transparent", border: "none", width: "100%" }}>
                    <CreditCardBox
                      cardNumber={card.cardNumber}
                      cardHolder={card.cardHolder}
                      cardMonth={card.cardMonth}
                      cardYear={card.cardYear}
                      cardCvv={card.cardCvv}
                      isCardFlipped={false}
                    ></CreditCardBox>
                  </button>
                </Col>
              ))}


              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content" style={{ width: "600px" }}>
                    <div className="modal-header" >
                      <h2 className="modal-title" id="exampleModalLabel">Edit Card</h2>



                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" >



                      <Fragment>
                        <div className="add-card-content">
                          <div className="wrapper">

                            <CardForm
                              selectedCreditCard={state}
                               onUpdateState={updateStateValues}
                              setIsCardFlipped={setIsCardFlipped}
                              handleSubmitAction={handleSubmitAction}
                            >
                              <Cards
                                cardNumber={state.cardNumber}
                                cardHolder={state.cardHolder}
                                cardMonth={state.cardMonth}
                                cardYear={state.cardYear}
                                cardCvv={state.cardCvv}
                                isCardFlipped={isCardFlipped}
                              ></Cards>
                            </CardForm>
                          </div>
                        </div>

                      </Fragment>
                      <Row className="d-flex float-end">
                        <Col md={6} className="">

                          <Button variant="link" size="sm" onClick={DeleteShow} style={{ width: "50px", marginRight: "10px" }}>
                            <i className="fas fa-trash-alt fa-2x" style={{ color: "red" }}></i>
                          </Button>{' '}

                        </Col>
                      </Row>
                      <Modal show={show}
                        size="lg"
                        centered
                      >
                        <Modal.Header>

                          <Modal.Title id="contained-modal-title-vcenter">Delete Card</Modal.Title>

                        </Modal.Header>
                        <Modal.Body>


                          <h5>Are you sure you want to remove this card?</h5>

                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="success" onClick={handleDeleteAction}>
                            Delete Card
                          </Button>
                          <Button variant="danger" onClick={handleClose}>
                            Exit
                          </Button>

                        </Modal.Footer>
                      </Modal>

                    </div>

                  </div>
                </div>
              </div>


            </Row>

          </Container>
        </div>

      </div>

    </>


  );
}
