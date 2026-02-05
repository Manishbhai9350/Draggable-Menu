import gsap from "gsap";
import "./App.css";
import Draggable from "./components/draggable";
import _Draggable from "gsap/Draggable";

gsap.registerPlugin(_Draggable)

function App() {
  return <main>
    <Draggable />
    <h1>Draggable Component</h1>
    <p>Build with Gsap, Gsap-React and Love </p>
    <p>Build by Developer Manish</p>
    <a target="_blank" href="https://x.com/iampetrknoll/status/2014710353599365593">inpiration</a>
  </main>;
}

export default App;
