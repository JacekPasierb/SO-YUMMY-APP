import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
const RecipePreparation = ({img, instructions}) => {
    const [step,setStep]=useState()


useEffect(()=>{
    if(instructions){
        console.log("o",instructions);
        const steps = instructions.split('. ');
        console.log("ss",steps);
        setStep(steps)
    }
},[instructions])
    
  return (
    <>
    {step && step.map((step, index) => (
        <p key={index}>{`${index + 1}. ${step}`}</p>
      ))}
  <img src={img}/>
    </>
  )
}

RecipePreparation.propTypes = {
    img: PropTypes.string,
    instructions: PropTypes.string
  };

export default RecipePreparation