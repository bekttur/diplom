import { useEffect, useRef } from 'react';
import Contact from './contact/Contact';

const AboutUs = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        handleVisibility(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [handleVisibility]);

  return (
    <div
      id='main'
      ref={ref}
      className='w-full h-screen'
      style={{ scrollSnapAlign: 'center' }}
    >
      <Contact />
    </div>
  );
};

export default AboutUs;
