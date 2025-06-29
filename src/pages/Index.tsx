
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex font-mono">
      {/* Ethereum Half */}
      <div 
        className="w-1/2 bg-black crypto-bubbles cursor-pointer group relative flex items-center justify-center transition-all duration-600"
        onClick={() => navigate('/ethereum')}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="crypto-bubble crypto-bubble-1"></div>
          <div className="crypto-bubble crypto-bubble-2"></div>
          <div className="crypto-bubble crypto-bubble-3"></div>
          <div className="crypto-bubble crypto-bubble-4"></div>
          <div className="crypto-bubble crypto-bubble-5"></div>
        </div>
        <button className="ethereum-button relative z-10 px-12 py-6 bg-transparent border-2 border-blue-500/30 text-white text-2xl font-bold tracking-wider rounded-lg transition-all duration-500 group-hover:border-transparent overflow-hidden">
          <span className="relative z-10">Ethereum</span>
          <div className="ethereum-border-animation absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      </div>

      {/* Solana Half */}
      <div 
        className="w-1/2 bg-black crypto-bubbles cursor-pointer group relative flex items-center justify-center transition-all duration-600"
        onClick={() => navigate('/solana')}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="crypto-bubble crypto-bubble-1"></div>
          <div className="crypto-bubble crypto-bubble-2"></div>
          <div className="crypto-bubble crypto-bubble-3"></div>
          <div className="crypto-bubble crypto-bubble-4"></div>
          <div className="crypto-bubble crypto-bubble-5"></div>
        </div>
        <button className="solana-button relative z-10 px-12 py-6 bg-transparent border-2 border-cyan-400/30 text-white text-2xl font-bold tracking-wider rounded-lg transition-all duration-500 group-hover:border-transparent overflow-hidden">
          <span className="relative z-10">Solana</span>
          <div className="solana-border-animation absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      </div>
    </div>
  );
};

export default Index;
