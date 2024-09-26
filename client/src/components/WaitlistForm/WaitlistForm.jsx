import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const WaitlistForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const doSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    //setEmail(e.target.value);
  };

  // const doSubmit = async (e) => {
  //   e.preventDefault();
  //   // setButtonClicked(true);
  //   setEmail(e.target.value);
  //   setSubmitted(true);
  // };

  useEffect(() => {
    //console.log(submitted, email)
    if (submitted && email) {
      // console.log("saving")
      const storeUserData = async () => {
        try {
          await supabase
            .from('waitlist')
            .insert([{
              email: email
            }]);

        } catch (error) {
          console.error('Error while waiting for data:', error);
        }
        setEmail('');
        setSubmitted(false);

      };
      storeUserData();
    }

  }, [submitted, email]);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="fixed top-0 right-0 m-4">
      <button
        className="hover:text-grey-300 text-white font-bold py-2 px-4 rounded"
        onClick={() => setModalOpen(true)}
      >
        Join our waitlist!
      </button>
      {modalOpen && (
        <div className="text-black fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-10 mx-10 max-w-md border-solid border-white ">
            <h1 className='text-4xl mb-3'>Hear about our future <span className='font-serif italic font-extrabold'>dora.</span> launches!</h1>
            <p>By signing up, you'll be among the first to know about our future launches and updates. We respect your privacy and won't send you any emails other than those directly related to our products and services.</p>
            <form onSubmit={doSubmit} className="w-full max-w-sm">
              <div className="flex items-center border-b border-teal-500 py-2">
                <input className="text-1xl appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="email" aria-label="email" value={email}
                  onChange={handleInputChange} required></input>
                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                  Sign Up
                </button>
                <button onClick={() => setModalOpen(!modalOpen)} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitlistForm;
