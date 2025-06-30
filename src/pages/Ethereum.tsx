
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WalletList from '@/components/WalletList';
import { generateEthereumWallet } from '@/lib/ethereum';
import { ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Wallet {
  id: number;
  publicKey: string;
  privateKey: string;
}

const Ethereum = () => {
  const navigate = useNavigate();
  const [secretPhrase, setSecretPhrase] = useState('');
  const [password, setPassword] = useState('');
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [walletCounter, setWalletCounter] = useState(1);

  const handleGeneratePhrase = () => {
    const demoPhrase = "danger scissors snow garbage defy bicycle decide leopard general dutch upper travel";
    setSecretPhrase(demoPhrase);
  };

  const handleCreateWallet = () => {
    const newWallet = generateEthereumWallet(secretPhrase);
    const wallet: Wallet = {
      id: walletCounter,
      publicKey: newWallet.publicKey,
      privateKey: newWallet.privateKey
    };
    setWallets(prev => [...prev, wallet]);
    setWalletCounter(prev => prev + 1);
  };

  const handleAddWallet = () => {
    if (secretPhrase) {
      handleCreateWallet();
    }
  };

  const handleClearWallets = () => {
    setWallets([]);
    setWalletCounter(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 p-8 font-mono">
      <button 
        onClick={() => navigate('/')}
        className="crypto-button mb-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded text-white flex items-center"
        style={{ color: '#3b82f6' }}
      >
        <ArrowUp className="w-4 h-4 mr-2 rotate-[-45deg]" />
        Back to Home
      </button>

      {wallets.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-white text-center mb-16 tracking-wide">
            Ethereum Wallet Generator
          </h1>

          <Card className="glassmorphism text-white border-white/20">
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl text-center font-bold">Create Your Wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              <div className="space-y-3">
                <Label htmlFor="secret-phrase" className="text-lg font-medium">Secret Phrase</Label>
                <Input
                  id="secret-phrase"
                  value={secretPhrase}
                  onChange={(e) => setSecretPhrase(e.target.value)}
                  placeholder="Paste your secret phrase here"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 font-mono h-14 text-lg px-6"
                />
              </div>

              <button 
                onClick={handleGeneratePhrase}
                className="crypto-button w-full h-14 bg-blue-600 hover:bg-blue-700 px-6 rounded text-white font-mono text-lg font-medium"
                style={{ color: '#3b82f6' }}
              >
                Generate Secret Phrase
              </button>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-lg font-medium">Password (Optional)</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 font-mono h-14 text-lg px-6"
                />
              </div>

              <button 
                onClick={handleCreateWallet}
                disabled={!secretPhrase}
                className="crypto-button w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 px-6 rounded text-white font-mono text-lg font-medium"
                style={{ color: '#3b82f6' }}
              >
                Create Wallet
              </button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <WalletList
          wallets={wallets}
          network="Ethereum"
          secretPhrase={secretPhrase}
          onClearWallets={handleClearWallets}
          onAddWallet={handleAddWallet}
        />
      )}
    </div>
  );
};

export default Ethereum;
