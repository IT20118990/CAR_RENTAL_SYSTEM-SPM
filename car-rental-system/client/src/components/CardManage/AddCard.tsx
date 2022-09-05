import React, { Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardForm from '../Card/CardForm';
import { CreditCard } from '../Card/CreditCard';
import Cards from '../Card/Card';
import axios from 'axios';

const initialState: CreditCard = {
  _id: '',
  cardNumber: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
};

export default function AddCard() {

  
  
  const [id , setID] = useState("");
  const [cardNumber , setCardNumber] = useState("");
  const [cardHolder , setCardHolder] = useState("");
  const [cardMonth , setCardMonth] = useState("");
  const [cardYear , setCardYear] = useState("");
  const [cardCvv , setCardCVV] = useState("");

  const navigate = useNavigate();
  const [state, setState] = useState<CreditCard>(initialState);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const updateStateValues = useCallback(
    (keyName: any, value: any) => {
      setState({
        ...state,
        [keyName]: value || '',
      });
    },
    [state],
  );

  function handleSubmitAction() {
    
    const cardData ={
      id:'',
      cardNumber:state.cardNumber,
      cardHolder:state.cardHolder ,
      cardMonth:state.cardMonth ,
      cardYear:state.cardYear,
      cardCvv:state.cardCvv,
      };
    console.log(cardData);
    console.log(state);

      axios.post('http://localhost:5000/api/cards', cardData)
      .then(function (response) {
        console.log(response.data);
        setID('');
        setCardNumber('');
        setCardHolder('');
        setCardMonth('');
        setCardYear('');
        setCardCVV('');
        window.location.replace("/view-cards");        
      });      
   
  }

  return (


    <>

<div className="text-center">
<button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{width:"200px", height:"50px",marginRight:"100px"}}>
Add New Card
</button>

</div>


<div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content" style={{width:"600px"}}>
      <div className="modal-header" >
        <h2 className="modal-title" id="exampleModalLabel">Add Card</h2>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body" style={{width:"600px", height:"800px"}}>


            
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
       
  
      </div>
     
    </div>
  </div>
</div>








      


    
    </>


   
  );
}
