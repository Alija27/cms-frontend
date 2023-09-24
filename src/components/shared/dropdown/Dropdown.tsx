import React from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { useState } from 'react';

type LinkProp = {
  dropdown: {
    text: any;
    childTexts: { child: any; url: any }[];
    className?: any;
  }[];
};

const Dropdown = (props: LinkProp) => {
  const { dropdown } = props;

  const [isMainLink1Open, setMainLink1Open] = useState(false);

  const MainLink1Toggle = () => {
    setMainLink1Open(!isMainLink1Open);
  };

  return (
    <>
      {dropdown.map((links, index) => (
        <div
          key={index}
          className={`hover:bg-gray-100 hover:text-black p-2 rounded-md border-rounded flex justify-end border-blue-700 space-x-10`}
          onClick={MainLink1Toggle}
        >
          <div className="">{links.text}</div>{' '}
          {isMainLink1Open ? <FaCaretDown /> : <FaCaretRight />}
        </div>
      ))}

      {isMainLink1Open && (
        <div className="">
          {dropdown.map((links, index) =>
            links.childTexts.map((text, index) => (
              <div key={index} className="hover:bg-lime-400 p-2 rounded hover:text-white">
                <a href={text.url}>{text.child}</a>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
