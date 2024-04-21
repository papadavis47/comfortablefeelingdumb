'use client';

import { useState, useEffect } from 'react';
import { VscTwitter, VscGithubInverted } from 'react-icons/vsc';
import { ImHome } from 'react-icons/im';
import { SiStackoverflow } from 'react-icons/si';
import { CgDetailsMore } from 'react-icons/cg';
import { debounce } from '@/utils/debounce';
import Link from 'next/link';
import Modal from '@/components/Modal';

function NavBar({}) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleScroll = debounce(() => {
    const currentScrollPos = window.scrollY;

    setIsVisible(
      (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 50) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, prevScrollPos, handleScroll]);

  return (
    <>
      {isOpen ? <Modal isOpen={isOpen} closeModal={closeModal} /> : null}
      <nav
        className={`sticky z-50 bg-original ${
          isVisible ? 'top-4' : '-top-20'
        } mx-auto mb-10 mt-4 w-full rounded-lg border-2 px-6 py-4 pt-4 shadow-lg backdrop-blur-md transition ease-linear sm:w-1/2`}
      >
        <div className='flex justify-between text-darkness sm:mx-auto sm:max-w-7xl'>
          {/* left */}
          <div className='hover:text-shift'>
            <Link href='/'>
              <ImHome size={30} />
            </Link>
          </div>
          {/* middle */}
          <div className='flex items-center space-x-5'>
            <a
              href='https://twitter.com/papadavis47'
              target='_blank'
              rel='noreferrer'
              className='hover:text-shift'
            >
              <VscTwitter size={30} />
            </a>
            <a
              href='https://github.com/papadavis47/comfortablefeelingdumb'
              target='_blank'
              className='hover:text-shift'
              rel='noreferrer'
            >
              <VscGithubInverted size={30} />
            </a>
            <a
              href='https://stackoverflow.com/users/9111781/jwdavis'
              target='_blank'
              rel='noreferrer'
              className='hover:text-shift'
            >
              <SiStackoverflow size={30} />
            </a>
          </div>
          {/* right */}
          <div className={`${isOpen ? 'invisible' : null}`}>
            <button className='hover:text-shift' onClick={toggleModal}>
              <CgDetailsMore size={30} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
