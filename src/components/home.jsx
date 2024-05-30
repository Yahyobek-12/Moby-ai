import { useState } from 'react';
import moby from '../assets/ai-2.png';
import Tesseract from 'tesseract.js';
import toast, { Toaster } from 'react-hot-toast';
import { CiCircleRemove } from "react-icons/ci";

const Home = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleDiv = () => {
    setToggle(!toggle);
  };

  const imgUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied Successfully');
    });
  };

  const ImgText = () => {
    setLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => console.log(m),
    })
    .then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-12">
      <Toaster />
      <div className='text-center'>
        <div className='flex items-center justify-center text-center'>
          <img src={moby} alt="moby-ai" className='w-[250px]' />
        </div>
        <div className='mt-5 px-6'>
          <div className="relative block">
            <input
              className="file-input absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              onChange={imgUpload}
            />
            <button className="py-3 w-[250px] bg-purple-500 text-white font-bold cursor-pointer rounded-md">
              Upload Image
            </button>
          </div>
          <button
            className='mt-2 bg-gradient-to-tr from-purple-400 to-purple-500 py-2 px-4 rounded-md font-bold text-white hover:opacity-80'
            onClick={ImgText}
          >
            Img To Text
          </button>
        </div>
        {loading ? (
          <div className='selected-div w-full h-screen absolute top-0 left-0 flex items-center justify-center'>
            <div>
              <img src={image} alt="selected-img" className='selected' />
              <p className='text-white font-bold text-3xl mt-5'>Generating...</p>
            </div>
          </div>
        ) : (
          text && (
            <div className={toggle ? 'hidden' : 'block'}>
              <div className='selected-div w-full h-screen absolute top-0 left-0 flex items-center justify-center px-2'>
                <CiCircleRemove onClick={toggleDiv} className='text-5xl py-2 px-2 text-white absolute top-[10px] right-[10px] cursor-pointer bg-red-500 rounded-md hover:opacity-80' />
                <div>
                  <h1 className='text-white font-bold text-2xl'>{text.slice(0, 50)}...</h1>
                  <button
                    className='py-2 px-4 bg-purple-500 mt-5 text-white font-bold rounded-md hover:opacity-80'
                    onClick={copyTextToClipboard}>
                    Copy Text
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
