
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Allroutes from './routes/Allroutes'

function App() {
 

  return (
    <>
    <div className="min-h-screen flex flex-col">
     <Navbar />
     <main className="flex-grow">
     <Allroutes />
     </main>
      <Footer />
    </div>
   
     
    </>
  )
}

export default App
