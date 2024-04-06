import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {Route, Routes} from 'react-router-dom';
import AddForm from './components/AddForm/AddForm';
function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='add-new-post' element={<AddForm/>}/>
        <Route path="*" element={<h1>Not found</h1>}/>
      </Routes>
    </>
  );
}

export default App;
