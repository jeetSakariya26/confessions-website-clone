import React 
//customize Alert for showing details
export default function Alert(props) {
  return (
    <div>
      <div className='Alert'>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
      </div>
    </div>
  )
}
