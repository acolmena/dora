import React, { useState } from 'react';

const PrivacyPolicyButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex justify-center fixed bottom-4 w-full z-50">
      <button
        className="hover:font-extrabold hover:text-white text-gray-300 text-sm font-bold py-2 px-4 rounded focus:outline-none"
        onClick={() => setModalOpen(true)}
      >
        Privacy Policy
      </button>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-10 mx-10 max-w-md border-solid border-white ">
            {/* <p className="text-sm">To get the most out of <span className='font-serif italic'>dora</span>, we'll need you to temporarily make your TikTok account and likes public. This allows our tool to accurately generate your personalized insights and recommendations!</p>
            <br /> */}
            <h2 className="text-base font-bold">We Collect:</h2>
            <ul className='list-disc mb-3'>
              <li className="text-sm">
                <span className="text-sm font-semibold">User Info:</span> Social media handles and destinations for a personalized experience.
              </li>
              <li className="text-sm">
                <span className="text-sm font-semibold">Activity Data:</span> Insights like preferences and activities to improve our service and offer personalized recommendations.
              </li>
            </ul>
            <h2 className="text-base font-bold">We Use Info For:</h2>
            <ul className='list-disc mb-3'>
              <li className="text-sm">
                <span className="text-sm font-semibold">Improvement & Personalization:</span> To enhance our tool and tailor it to your interests.
              </li>
            </ul>
            <h2 className="text-base font-bold">Sharing:</h2>
            <p className="text-sm mb-3">Your data isn't sold or traded. Trusted partners may access it for service operations under confidentiality. We may disclose data to comply with laws or protect rights.</p>
            {/* <h2 className="text-base font-bold">Your Agreement:</h2>
            <p className="text-sm">Using our tool means you agree to this policy.</p> */}
            <h2 className="text-base font-bold">Updates:</h2>
            <p className="text-sm mb-3">We may update this policy; check our site for the latest version. Contact <a className='underline' href="mailto:travelwdora@gmail.com">travelwdora@gmail.com</a> for questions.</p>
            <div className="flex justify-center">
              <button
                className="mt-10 bg-white text-black font-bold py-2 px-4 rounded focus:outline-none"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicyButton;
