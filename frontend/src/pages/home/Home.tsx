import { HomeProps } from '../../app.interface';
import Advantages from './advantages/Advantages';
import FAQ from './faq/FAQ';
import Main from './main/Main';


const Home = ({ handleVisibility }: HomeProps) => {

  return (
    <div className='html'>
      <Main handleVisibility={handleVisibility} />
      <Advantages />
      <FAQ />
    </div>
  );
};

export default Home;

