import ShoppingList from './ShoppingList';
import MainCarousel from './MainCarousel';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="home">
      <Navbar />
      <MainCarousel />
      <ShoppingList />
      <Footer />
    </div>
  );
};

export default Home;
