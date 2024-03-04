import { jellyTriangle } from 'ldrs';

const Loading = () => {
  jellyTriangle.register();

  return (
	<div className='w-full h-screen bg-[#00000083] flex items-center justify-center fixed left-0 top-0'>
		<l-jelly-triangle size='30' speed='1.6' color='#fff'></l-jelly-triangle>
	</div>
  );
};

export default Loading;
