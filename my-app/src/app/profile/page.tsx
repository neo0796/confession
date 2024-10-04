"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ProfilePageDC = () => {
  const searchParams = useSearchParams();
  const account = searchParams.get('account');
  const balance = searchParams.get('balance') || '0 DC'; // Fallback to '0 DC' if balance is not provided

  const demoName = "User123";
  const [showModal, setShowModal] = useState(false);

  const redeem = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000); // Hide modal after 2 seconds
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden">
      {/* Profile Information Container with Increased Width */}
      <div className="bg-gray-900 bg-opacity-80 shadow-2xl rounded-lg p-10 max-w-2xl w-full transform hover:scale-105 transition-transform duration-500 ease-in-out">
        <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          Profile Information
        </h1>
        <div className="mb-6">
          <p className="mb-4 text-xl"><strong className="text-green-400">Name:</strong> {demoName}</p>
          <p className="mb-4 text-xl"><strong className="text-blue-400">Connected MetaMask Account:</strong> {account}</p>
          <p className="mb-6 text-xl"><strong className="text-yellow-400">Available Balance:</strong> {balance}</p>
        </div>
        <button
          onClick={redeem}
          className="w-full text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 transition-all duration-300 px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105"
        >
          Redeem
        </button>
      </div>

      {/* Modal - Redeem Successful */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50 transition-all duration-500 ease-in-out">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg transform scale-95 animate-bounce">
            <h2 className="text-3xl font-bold text-green-400">Redeem Successful!</h2>
            <p className="mt-4">Your {balance} have been redeemed successfully.</p>
          </div>
        </div>
      )}

      {/* Decorative Gradient Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
    </div>
  );
};

export default ProfilePageDC;
