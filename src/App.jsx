import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style.css'

function App() {
  const [bill, setBill] = useState('');
  const [tipPercentage, setTipPercentage] = useState(0);
  const [people, setPeople] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [tipPerPerson, setTipPerPerson] = useState('0.00');
  const [totalPerPerson, setTotalPerPerson] = useState('0,00');

  const tipOptions = [5, 10, 15, 25, 50];


  useEffect(() => {
    const billAmount = parseFloat(bill);
    const numberOfPeople = parseInt(people, 10);
    const tipRate = tipPercentage;

    const isBillValid = !isNaN(billAmount) && billAmount > 0;
    const isPeopleValid = !isNaN(numberOfPeople) && numberOfPeople > 0;
    const isTipSelected = tipRate > 0;

    if (!isBillValid || !isPeopleValid || !isTipSelected) {
        
      setTipPerPerson('0.00');
      setTotalPerPerson('0.00');
      
      if (bill !== '' && !isBillValid) {
        setErrorMessage("Fatura değeri geçersiz.");
      } else if (people !== '' && !isPeopleValid) {
        setErrorMessage("Kişi sayısı geçersiz.");
      } else {
        setErrorMessage('');
      }
      return;
  }
  setErrorMessage('');

    const totalTip = billAmount * tipRate;
    const tipAmountPerPerson = totalTip / numberOfPeople;
    const totalAmount = billAmount + totalTip;
    const totalPerPersonAmount = totalAmount / numberOfPeople;

    setTipPerPerson(tipAmountPerPerson.toFixed(2));
    setTotalPerPerson(totalPerPersonAmount.toFixed(2));
  
  }, [bill, people, tipPercentage]);

  const handleReset = () => {
    setBill('');
    setTipPercentage(0);
    setPeople('');
    setTipPerPerson('0.00');
    setTotalPerPerson('0.00');
    setErrorMessage('');
  };

  return (
    <>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
    </head>
    <form 
      onSubmit={(e) => e.preventDefault()}>
      <h1>S P L I <br />T T E R</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <div className='container'>
        <div className='bill'>
          <p>Bill</p>
          <div className='input'>
            <input type='number'
            placeholder='0.0'
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            name= "price"
            min="0"
            step="0.01" 
            />
          </div>
        </div>
        <div className='select'>
          <div className='box1'>
            {[0,1].map(index => (
              <button
                key = {tipOptions[index]}
                type="button"
                onClick={() => setTipPercentage(tipOptions[index] / 100)}>
                  {tipOptions[index]}%
                </button>
            ))}
          </div>
          <div className='box2'>
            {[2,3].map(index => (
              <button
                key={tipOptions[index]}
                type="button"
                onClick={() => setTipPercentage(tipOptions[index] / 100)}>
                  {tipOptions[index]}%
                </button>
            ))}
          </div>
          <div className='box3'>
             <button
              type="button"
              onClick={() => setTipPercentage(tipOptions[4] / 100)}>
                {tipOptions[4]}%
             </button>            
          </div>
        </div>
        <div className='people'>
          <p>Number of People</p>
          <div className='inputBtn2'>
            <input 
            type='number'
            placeholder='0'
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            name="people"
            min="1"
            />
          </div>
        </div>
        <div className='person'>
          <div className='tip'>
            <p>Tip Amount <br /> <span>/ person</span></p>
            <h2>${tipPerPerson}</h2>
          </div>
          <div className='total'>  
            <p>Total <br /> <span>/ person</span></p>
            <h2>${totalPerPerson}</h2>
          </div>
          <div>
            <button
            type="button"
            onClick={handleReset}
            disabled={bill === '' && people === '' && tipPercentage === 0}
            className="resetBtn"
            >RESET</button>
          </div>
        </div>
      </div>
    </form> 
  </>
  )
}

export default App
