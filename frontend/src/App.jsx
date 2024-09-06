import Card from "./Card.jsx";
import './index.css'

function App() {

  const users = [
    {
      name : 'Alexa',
      age : 22,
      gmail :'Alexa@gmail.com',
      
    },
    {
      name : 'Delba',
      age : 28,
      gmail :'Delba@gmail.com'
    },
    {
      name : 'Alia',
      age : 25,
      gmail :'Alia@gmail.com'
    },
    {
      name : 'Sana',
      age : 30,
      gmail :'Sana@gmail.com'
    },
    {
      name : 'Maria',
      age : 18,
      gmail :'Maria@gmail.com'
    }
  ]


  return (
   <>
   {/* {
    users.map((user)=>{
      return <Card name={user.name}/>
    })
   } */}
   <h1>Hello World</h1>
   </>
  )
}

export default App
