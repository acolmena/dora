import React, { useState, useEffect } from 'react';
import { Header, Loading, Result, Username } from './components';
import Adj from './components/Adj/Adj'
import City from './components/City/City';
import HowItWorks from './components/HowItWorks/HowItWorks';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import DescribeYourself from './components/DescribeYourself/DescribeYourself';
import WaitlistForm from './components/WaitlistForm/WaitlistForm';

const App = () => {
  const [dataFromChild, setDataFromChild] = useState({});
  const [dataFromNoTik, setDataFromNoTik] = useState({});


  // Receiving data from Username child
  const handleDataFromChild = async (data) => {
    // Handle the data received from the child component
    // console.log('Data received from child:', data);
    setDataFromChild(data);
  }
  const handleDataFromNoTik = async (data) => {
    // Handle the data received from the child component
    //console.log('Data received from notiktok child:', data);
    setDataFromNoTik(data);
  }

  useEffect(() => {
    const smoothScroll = async () => {
      const adjSection = document.querySelector('#adjSection');
      if (adjSection) {
        adjSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    smoothScroll();
  }, [dataFromChild.showAdjs]);

  useEffect(() => {
    const smoothScroll = async () => {
      const citySection = document.querySelector('#city');
      if (citySection) {
        citySection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    smoothScroll();
  }, [dataFromNoTik.showAdjs]);

  return (
    <div className='pl-px-8'>
      <Header />
      <WaitlistForm />
      <PrivacyPolicy />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <HowItWorks />
      {dataFromChild.user != 'no tiktok' && <Username onData={handleDataFromChild} />}
      {dataFromChild.user == 'no tiktok' && <DescribeYourself onData={handleDataFromNoTik} />}
      {dataFromChild.showAdjs && <Adj adjs={dataFromChild.adjs} />}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <City username={dataFromChild.user} adjs={dataFromChild.adjs} hashtags={dataFromChild.sortedHashes}/> */}
      {(dataFromChild.showAdjs || dataFromNoTik.showAdjs) && <City username={dataFromChild.user} adjs={dataFromChild.adjs == 'no tiktok' ? dataFromNoTik.adjs : dataFromChild.adjs} hashtags={dataFromChild.sortedHashes} />}
      {/* {dataFromCity.showIti && <Result results={dataFromCity.itinerary} urls={dataFromCity.urls}/>} */}
    </div>
  );
}

export default App
