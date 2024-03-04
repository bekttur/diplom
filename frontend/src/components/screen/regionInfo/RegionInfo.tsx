import { motion } from 'framer-motion';

const RegionInfo = ({ selectedPath }: { selectedPath: string | null }) => {
	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			transition={{ duration: 0.5}}
		style={{
			boxShadow: '0 0 10px #00000026'
		}} className='border-border border-gray-100 w-1/1 h-fit p-2 bg-red' >
			<h1>{selectedPath}</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptatem, porro nesciunt vitae obcaecati voluptatibus cum minima harum doloremque beatae iste labore soluta odit saepe consectetur sequi quibusdam deserunt quaerat. Dolorem unde soluta reiciend. iusto natus?</p>
		</motion.div>
	)
}

export default RegionInfo