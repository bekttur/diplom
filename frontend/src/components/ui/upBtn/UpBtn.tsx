import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface UpBtnProps {
	isMainVisible: boolean;
  }

const UpBtn = ({ isMainVisible }: UpBtnProps) => (
  !isMainVisible && (
    <motion.a
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      href='#main'
      className='w-[50px] h-[50px] rounded-full fixed bottom-20 right-5 z-50 bg-[#FFC002] flex items-center justify-center'
    >
      <ChevronUp color='white' />
    </motion.a>
  )
);

export default UpBtn;
