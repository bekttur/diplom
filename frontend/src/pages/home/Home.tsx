import { HomeProps } from '../../app.interface';
import Advantages from './advantages/Advantages';
import Contact from './contact/Contact';
import FAQ from './faq/FAQ';
import Main from './main/Main';


const Home = ({ handleVisibility }: HomeProps) => {


  return (
    <div>
      <Main handleVisibility={handleVisibility} />
      <Advantages />
      <FAQ />
      <Contact />      
    </div>
  );
};

export default Home;
