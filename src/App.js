import HeaderNav from './components/HeaderNav';
import Recipes from './components/Recipes';

import './App.css';

function App() {

  return (
    <div className="App">
        <div className="background-filter"></div>
        <div className="background-img"></div>        
        <HeaderNav/>
        <h1>Toutes mes recettes</h1>
        <Recipes/>

    </div>
  );
}

export default App;


// import {API_URL} from './global.js';
// import './App.css';

// import axios from 'axios'; 

// function App() {

//   const test = e => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const data = new FormData(form);
//     // const xhr = new XMLHttpRequest();
//     // xhr.onload = function() {}
//     // xhr.open("post", "http://localhost:9000/api/test");      // open connection
//     // xhr.send(data);  
//     axios.post(`${API_URL}test`, data).then(res => {
//       console.log(res);
//     }).catch(err => {
//       console.log(err);
//     });
   
//   }


//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <form encType="multipart/form-data" onSubmit={test}>
//         <input type="file" name="image" />
//         <input type="submit"/>
//       </form>
//     </div>
//   );
// }

// export default App;
