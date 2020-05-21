import React from 'react';
import './App.css';
import Header from './layout/Header';
import Main from './layout/Main';
import CategoryList from './layout/CategoryList';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <CategoryList />
      <Footer />
    </div>
  );
}

export default App;
