import React from 'react'

export default function Tour (props) { //Functional component 
  const { name, image, city } = props;

    return (
      <div className="card-container">
        <div className="card-img">
          <img src={image} alt="" />
          <div className={"cardsText"}>
            <h1>{name}</h1>
            <h2>{city}</h2>
          </div>
        </div>
      </div>
    )
}
