import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import TechSections from '../components/sections/TechSections';

export default function Home() {
  return <main className="site-shell"><Navbar /><Hero /><TechSections /><Footer /></main>;
}


