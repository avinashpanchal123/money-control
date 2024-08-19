import { useState } from "react";

function Counter() {
    let [counter, setCounter] = useState(0);
    let changeCounter = (val) => {

        setCounter(counter + val)
    }
    return (
        <>/
            <h1 className="bg-green-400 text-black p-4 rounded-xl text-center mb-4"> Tailwind CSS</h1>
            


            {/* <div className="counter">
            This is {counter}
           </div>
           <button className="bg-green-400 text-black p-4 rounded-xl" onClick={()=>{ if(counter < 20) changeCounter(1)}}>
             add 
           </button>
           <button className="delete" onClick={()=>{ if(counter > 0) changeCounter(-1)}}>
            delete
           </button>
           <p>
            this is chai {counter}
           </p> */}
        </>
    )
}

export default Counter