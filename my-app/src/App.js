import './App.css';
import React from 'react';

function App() {
  const [array, setArray] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:8080/mongoose', { mode: 'cors' })
      .then(res => res.json())
      .then(setArray);
  }, []);

  return (
    <div className="App">
      {<div>
        {
          array
            ? array.map(item => Object.entries(item).map(([key, value]) =>
              <p key={key}>{key}: {JSON.stringify(value)}</p>
            ))
            : "Loading..."
        }
      </div>}
    </div>
  );
}

export default App;
