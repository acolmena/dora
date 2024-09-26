import React, { useState } from 'react';
import axios from 'axios';

const DescribeYourself = ({ onData }) => {
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  //   const [response, setResponse] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all inputs are filled
    if (inputs.input1 && inputs.input2 && inputs.input3) {
      setIsLoading(true);
      try {
        onData({ adjs: `${inputs.input1}, ${inputs.input2}, ${inputs.input3}`, showAdjs: true });
        // setResponse(response.data.result);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    // else {
    //   alert('Please fill in all required inputs');
    // }
  };

  return (
    <section className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-3xl font-bold text-center text-white mb-8 mt-80 px-7">Write three things that you want your trip to be defined with!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center px-10">
        <input
          style={{ fontSize: '1.2rem' }}
          className="bg-white border border-gray-300 text-center font-serif italic text-gray-600 lg:text-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full"
          type="text"
          name="input1"
          value={inputs.input1}
          onChange={handleChange}
          placeholder="star wars lover"
          required
        />
        <br />
        <input
          style={{ fontSize: '1rem' }}
          className="bg-white border border-gray-300 text-center font-serif italic text-gray-600 lg:text-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full"
          type="text"
          name="input2"
          value={inputs.input2}
          onChange={handleChange}
          placeholder="japanese food enthusiast"
          required
        />
        <br />
        <input
          style={{ fontSize: '1.2rem' }}
          className="bg-white border border-gray-300 text-center font-serif italic text-gray-600 lg:text-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full"
          type="text"
          name="input3"
          value={inputs.input3}
          onChange={handleChange}
          placeholder="museum nerd"
          required
        />
        <br />
        <button className="text-black font-bold bg-orange-200 hover:bg-orange-300 rounded-full text-sm px-5 py-2.5 me-2 mb-2 mt-2 shadow white-bg" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'plan my trip!'}
        </button>
      </form>
    </section>
  );
};

export default DescribeYourself;
