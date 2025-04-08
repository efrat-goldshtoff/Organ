import { useState } from 'react';
import './App.css'
import { Organ1, Organ2 } from './components/Organ';

function App() {


  function setEmojiFavicon(emoji: string) {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    ctx!.font = "50px Arial";
    ctx!.textAlign = "center";
    ctx!.textBaseline = "middle";
    ctx!.fillText(emoji, 32, 32);

    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = canvas.toDataURL("image/png");

    document.head.appendChild(favicon);
  }

  setEmojiFavicon("🎹");

  const [bt, setBt] = useState(true);
  return (
    <>
      <div className="App">
        <h1>אורגן</h1>
        <button onClick={() => setBt(true)}>option one</button>
        <button onClick={() => setBt(false)}>option two</button>
        {bt && <Organ1 />}
        {!bt && <Organ2 />}

      </div>
    </>
  )
}

export default App
