import React from 'react';
import './ImageLinkFrom.css';

const ImageLinkFrom = ({inputChange, buttonSubmit}) => {
	return(
          <div className = '' >
             <p className = 'f3 tc '> {'This Magic will detect faces'}</p>
             <div className= ' from center pa3 br3 shadow-3 back'>   
                <input className = 'f4 pa2 w-70 center  ' type = 'text' onChange = {inputChange}  />
                <button className ='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick = {buttonSubmit}>Detect</button>
                 
            </div>
          </div>
		);
}
export default ImageLinkFrom;