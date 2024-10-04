'use client';

import { useState, useEffect, useRef } from "react";
import { HiSparkles } from "react-icons/hi"; // Optional icon for added flair
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import Link from 'next/link'; // Use Link to navigate

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0 DC'); // Set initial balance to '15 DC'
  const logoRef = useRef<HTMLDivElement>(null); // Ref for logo animation

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.error('MetaMask is not detected');
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]); // Store the first account address
        console.log('Connected account:', accounts[0]);

        // Fetch the balance here (for example purposes, set to 15 DC)
        setBalance('15 DC'); // Replace this with your logic to fetch balance
      } catch (error) {
        console.error("User denied wallet connection or another error occurred:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-transparent z-50">
      <div 
        ref={logoRef} 
        className="flex items-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
      >
        <HiSparkles className="mr-2 text-yellow-300 text-2xl animate-bounce" /> {/* Optional sparkles icon */}
        <a href="/">Divine Confessor</a>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Balance Display (Only show if connected) */}
        
          <div className="text-white font-semibold">
            Balance: {balance}
          </div>
      
        
        {/* Profile Button */}
        <Link href={`/profile?account=${account}&balance=${balance}`}>
          <button 
            className="text-white bg-blue-500 hover:bg-blue-400 transition duration-300 px-4 py-2 rounded-lg flex items-center space-x-2 transform hover:scale-105"
          >
            <FaUserCircle className="text-2xl" />
            <span>Profile</span>
          </button>
        </Link>

        {/* Connect MetaMask Button */}
        <button 
          onClick={isConnected ? undefined : connectWallet} 
          className="text-white bg-green-500 hover:bg-green-400 transition duration-300 px-4 py-2 rounded-lg transform hover:scale-105"
        >
          {isConnected ? `${account?.substring(0, 6)}...${account?.substring(account.length - 4)}` : "Connect MetaMask"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
