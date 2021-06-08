import React from 'react';
import './FaceRecognition.css'


const FaceRecognition = ({imageUrls, box}) =>
{

	return (
		<div className='center ma '  >
		<div className= 'absolute mt2'>
           <img id = 'inputimage' src ={imageUrls} alt = '' width= '500px' height = 'auto' />
           <div className = 'bounding-box'
            style = {{top:box.topBox, right:box.rightBox, bottom:box.bottomBox, left:box.leftBox}} ></div>
		</div>
		</div>

		);
}

export default FaceRecognition;