import Header from "./components/Header"
import Hero from "./components/Hero"
import Statistics from "./components/Statistics"
import Faculty from "./components/Faculty"
import Organizers from "./components/Organizers"
import Footer from "./components/Footer"
import AnimatedBackground from "./components/AnimatedBackground"
import "./App.css"

const App = () => {
  return (
    <div className="min-h-screen bg-white text-foreground relative overflow-x-hidden">
      <AnimatedBackground />
      <Header />
      <Hero />
      <Statistics />
      <Faculty />
      <Organizers />
      <Footer />
    </div>
  )
}

export default App
