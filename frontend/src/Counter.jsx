import { useState } from "react";

function Counter(){
    let [counter, setCounter ] = useState(0);
    let changeCounter = (val)=>{
        setCounter(counter + val)
    }
    return (
        <>
           <div className="counter">
            This is {counter}
           </div>
           <button className="add" onClick={()=>changeCounter(1)}>
             add 
           </button>
           <button className="delete" onClick={()=> changeCounter(-1)}>
            delete
           </button>
           <p>
            this is chai {counter}
           </p>
        </>
    )
}

export default Counter