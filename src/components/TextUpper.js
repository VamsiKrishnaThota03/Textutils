import React, {useState} from 'react';

export default function TextUpper(props) {

    const handleOnChange=(event)=>{
        setText(event.target.value)
    }

    const handleOnClick=()=>{
        let newText = text.toUpperCase();
        console.log(newText)
        setText(newText);
    }

    const handleOnLowClick=()=>{
        let newText = text.toLowerCase();
        setText(newText);
    }

   const [text,setText] = useState('')

  return (
    <>
  <div className={`container mt-3 text-${props.mode=='light'?'dark':'light'}`}>
  <h3>{props.text}</h3>
        <textarea className='form-control' value={text} onChange={handleOnChange} id="my-box" rows="8"></textarea>
    </div>
    <div className='container m-4 text-center'>

      <button className="btn btn-primary m-4" onClick={handleOnClick}>ChangeToUpper</button>
        
      <button className="btn btn-primary m-4" onClick={handleOnLowClick}>ChangeToLower</button>
    </div>

    </>
  )
}
