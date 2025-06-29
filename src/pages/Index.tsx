
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Ethereum Half */}
      <div 
        className="w-1/2 rgb-bubbles cursor-pointer group relative flex items-center justify-center transition-all duration-600 hover:ethereum-hover"
        onClick={() => navigate('/ethereum')}
      >
        <div className="absolute inset-0 group-hover:bg-gradient-to-br group-hover:from-blue-900 group-hover:to-purple-800 transition-all duration-600 opacity-0 group-hover:opacity-100" />
        <h1 className="text-6xl font-bold text-white z-10 relative tracking-wider drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
          Ethereum
        </h1>
      </div>

      {/* Solana Half */}
      <div 
        className="w-1/2 rgb-bubbles cursor-pointer group relative flex items-center justify-center transition-all duration-600 hover:solana-hover"
        onClick={() => navigate('/solana')}
      >
        <div className="absolute inset-0 group-hover:bg-gradient-to-br group-hover:from-black group-hover:via-blue-900 group-hover:to-blue-600 transition-all duration-600 opacity-0 group-hover:opacity-100" />
        <h1 className="text-6xl font-bold text-white z-10 relative tracking-wider drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
          Solana
        </h1>
      </div>
    </div>
  );
};

export default Index;
