import AddNavbar from '../../../components/screen/addNavbar/AddNavbar';
import { motion } from 'framer-motion';
const AddPage = () => {

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='w-full h-screen flex flex-col items-center justify-center'
        style={{scrollSnapAlign: 'center'}}
      >
        <div className='w-fit h-[32rem] flex flex-col items-center justify-start'>
            <AddNavbar />
        </div>
      </motion.div>
    </>
  );
};

export default AddPage;
