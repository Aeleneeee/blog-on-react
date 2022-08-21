import './App.css';
import { Header } from './components/Headers/Header';
import { BlogContent } from './components/BlogContent/BlogContent';
import { Footer } from './components/Footers/Footer';

export function App() {
  return (
    <div className="App">

    <Header/>

      <main>
       <BlogContent/>
      </main>


    <Footer
      year={new Date().getFullYear()}
    />
      
    </div>
  );
}



