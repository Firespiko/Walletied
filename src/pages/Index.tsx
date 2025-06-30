import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-mono">
      {/* Choose Your Poison Header */}
      <div className="flex justify-center items-center py-8 bg-black">
        <h1 className="text-4xl font-bold neon-text-rainbow animate-pulse">
          Choose Your Poison
        </h1>
      </div>

      <div className="flex flex-1">
        {/* Ethereum Half */}
        <div 
          className="ethereum-section w-1/2 bg-black crypto-bubbles cursor-pointer group relative flex items-center justify-center transition-all duration-800"
          onClick={() => navigate('/ethereum')}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="crypto-bubble crypto-bubble-1"></div>
            <div className="crypto-bubble crypto-bubble-2"></div>
            <div className="crypto-bubble crypto-bubble-3"></div>
            <div className="crypto-bubble crypto-bubble-4"></div>
            <div className="crypto-bubble crypto-bubble-5"></div>
            <div className="crypto-bubble crypto-bubble-6"></div>
            <div className="crypto-bubble crypto-bubble-7"></div>
          </div>
          <button className="ethereum-button relative z-10 px-16 py-8 text-white text-3xl font-bold tracking-wider rounded-lg">
            <span className="relative z-10">Ethereum</span>
          </button>
        </div>

        {/* Solana Half */}
        <div 
          className="solana-section w-1/2 bg-black crypto-bubbles cursor-pointer group relative flex items-center justify-center transition-all duration-800"
          onClick={() => navigate('/solana')}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="crypto-bubble crypto-bubble-1"></div>
            <div className="crypto-bubble crypto-bubble-2"></div>
            <div className="crypto-bubble crypto-bubble-3"></div>
            <div className="crypto-bubble crypto-bubble-4"></div>
            <div className="crypto-bubble crypto-bubble-5"></div>
            <div className="crypto-bubble crypto-bubble-6"></div>
            <div className="crypto-bubble crypto-bubble-7"></div>
          </div>
          <button className="solana-button relative z-10 px-16 py-8 text-white text-3xl font-bold tracking-wider rounded-lg">
            <span className="relative z-10">Solana</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
