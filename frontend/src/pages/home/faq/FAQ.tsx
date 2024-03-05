import { MinusCircle, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from './faq.data';

const variants = {
  initial: {
    y: 80,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  return (
    <motion.div
      className='w-full h-screen flex flex-col justify-start items-center gap-24'
      style={{ scrollSnapAlign: 'center', overflow: 'hidden' }}
      variants={variants}
    >
      <h2 className='pt-[50px] text-[36px] text-[#00749E] dark:text-[#51A7D3]'>
        Часто задаваемые вопросы
      </h2>

      <motion.div
        variants={variants}
        initial='initial'
        whileInView='animate'
        className='w-[89%] max-w-[1400px] p-8 rounded-lg shadow-[0_5px_30px_-10px_rgba(0,0,0,0.3)]'
      >
        {questions.map((q) => (
          <motion.div variants={variants} key={q.id} className='mb-4 last:mb-0'>
            <button
              className='w-full text-left text-xl focus:outline-none p-4 bg-[#f2f2f25f] dark:bg-[#5c5c5c58] rounded-lg shadow-md flex items-center justify-between'
              onClick={() =>
                setActiveQuestion(activeQuestion === q.id ? null : q.id)
              }
            >
              {q.question}
              {activeQuestion === q.id ? <MinusCircle color='#3E5F7D' /> : <PlusCircle color='#3E5F7D' />}
            </button>
            <AnimatePresence>
              {activeQuestion === q.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className='mt-2 text-[#656565] dark:text-[#D1D5DB] ml-4'
                >
                  <p>{q.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
