
import React, { useEffect, useRef, useState } from "react";
import Modal from "./modal/Modal";
import './RateList.css'
import { parseISO, format } from "date-fns";






const RateList = function({numCode, charCode, value, prevValue, nameRu, nominal, classList, prevURL}) {

    const [modalActive, setModalActive] = useState(false);
    const [arrValute, setArrValute] = useState([]);

  
    let ref = useRef()

    function showTip() {
        
        if(ref.current && !modalActive){
            ref.current.style.display = "block";
        }
    }
    
  function hideTip() {  
      if(ref.current){
        ref.current.style.display = "none";
      }
    
    }
  
  function moveTip(e) {
    if(ref.current && !modalActive){
        let WID = document.documentElement.clientWidth;
        let HEI = document.documentElement.clientHeight;
        
        let x = e.pageX + 10 - (ref.current.style.width+20)  * (WID < e.pageX + ref.current.style.width + 20);
        let y = e.pageY + 10 - (ref.current.style.height+40)  * (HEI < e.pageY + ref.current.style.height + 20);
        
        ref.current.style.left = x + "px";
        ref.current.style.top = y + "px";
    }
  }
  
 


  async function valuteStatistics() {
    if(nameRu) {
        setModalActive(true)
        let previousUrl = prevURL

    
        for(let i=0; i<10; i++) {
            try {
                const respons = await fetch(previousUrl)
                const resp = await respons.json();
                let objWithData = {...resp.Valute[charCode], Data: format(parseISO(resp.Date), 'dd.MM.yyyy')}
                setArrValute(prevState => [...prevState, objWithData])
                previousUrl = resp.PreviousURL
            } catch (err) {
                console.log(err.message);
            }
        }
    }
    
  }

    function onClickHandler() {
        setModalActive(false)
        setArrValute([])
    }


  
  


    return (
        
     <div>
         <div
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
            onMouseMove={moveTip}
            onClick={() => valuteStatistics()}
            className={classList}
         >
            <div className='list__block-item'>
                {numCode}
            </div>
            
            <div className='list__block-item'>
                {charCode}
            </div>

        
            <div className='list__block-item'>
                {nominal}
            </div>
            
            <div className='list__block-item'>
                {value}
            </div>
            <div className='list__block-item'>
                {prevValue}
            </div>
            {nameRu && 
            <div ref={ref} className="tooltip">{nameRu}</div>}
            
        </div>
        {nameRu && 
            <Modal 
                active={modalActive} 
                onClick={onClickHandler}>
                    <h2 className="modal__head-text">{nameRu} - изменение курса</h2>
                    <div className="modal-block">
                    <div className="modal__item">
                        <div className ="modal__item-cell">Дата</div>
                        <div className ="modal__item-cell">Букв. код</div>
                        <div className ="modal__item-cell">Единиц</div>
                        <div className ="modal__item-cell">Курс</div>
                    </div>
                    {arrValute.map(item =>
                        <div className="modal__item" key={item.Data}>
                            <div className ="modal__item-cell">{item.Data}</div>
                            <div className ="modal__item-cell">{item.CharCode}</div>
                            <div className ="modal__item-cell">{item.Nominal}</div>
                            <div className ="modal__item-cell">{Number(item.Value).toFixed(4)}</div>
                        </div>
                        )}
                    </div>
            </Modal>}
        
     </div>   
        
        
        
       
       
    )
}

export default RateList