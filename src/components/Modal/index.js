import React from 'react';

const Modal = (props) => {
  return props.showModal && (
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="modalHeader">
                <h4>Clear All BMI data</h4>
            </div>
            <div className="modalBody">
              <p>This action is irreversible. Are you sure you want to delete all data?</p>
              
            </div>
            <div className="modalFooter">
              <button className="modalBtn" onClick={props.hideModal}>Annuler</button>
              <button className="modalBtn modalBtnDel" onClick={props.deleteALLDataBmi} >Supprimer</button>
            </div>
            
        </div>
    </div>
)
}


export default Modal