import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="main">
      <Navbar />
      <SearchBar />
    </div>
  );
}

export default App;
