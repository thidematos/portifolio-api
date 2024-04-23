import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HambMenu({
  divWidth = 'w-full',
  imgWidth = 'w-[50%]',
  linksArray = [],
  top = '',
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${divWidth} relative z-[999]`}>
      <img
        className={`${imgWidth} cursor-pointer`}
        src={`${isOpen ? 'close' : 'open'}-menu.png`}
        onClick={() => setIsOpen((state) => !state)}
      ></img>
      <ul
        className={`rounded-lg font-poppins text-xl  text-gray-50 absolute bg-orange-400/95 shadow-xl ${
          isOpen ? 'flex' : 'hidden'
        } flex-col justify-center items-center tracking-wider right-0 ${top}`}
      >
        {linksArray.map((link, ind, arr) => (
          <Link to={link.to} key={ind}>
            <li
              className={`${
                arr.length - 1 === ind ? '' : 'border-b-2 border-b-blue-300'
              }  drop-shadow-md px-10 py-4`}
            >
              {link.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default HambMenu;
