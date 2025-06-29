
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WalletCard from '@/components/WalletCard';
import { generateEthereumWallet } from '@/lib/ethereum';
import { ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Ethereum = () => {
  const navigate = useNavigate();
  const [secretPhrase, setSecretPhrase] = useState('');
  const [password, setPassword] = useState('');
  const [wallet, setWallet] = useState<{ publicKey: string; privateKey: string } | null>(null);

  const handleGeneratePhrase = () => {
    // Placeholder for secret phrase generation
    const demoPhrase = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
    setSecretPhrase(demoPhrase);
  };

  const handleCreateWallet = () => {
    const newWallet = generateEthereumWallet(secretPhrase);
    setWallet(newWallet);
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

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12 tracking-wide">
          Ethereum Wallet Generator
        </h1>

        <Card className="glassmorphism text-white border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Create Your Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="secret-phrase">Secret Phrase</Label>
              <Input
                id="secret-phrase"
                value={secretPhrase}
                onChange={(e) => setSecretPhrase(e.target.value)}
                placeholder="Paste your secret phrase here"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 font-mono"
              />
            </div>

            <button 
              onClick={handleGeneratePhrase}
              className="crypto-button w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-mono"
              style={{ color: '#3b82f6' }}
            >
              Generate Secret Phrase
            </button>

            <div className="space-y-2">
              <Label htmlFor="password">Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 font-mono"
              />
            </div>

            <button 
              onClick={handleCreateWallet}
              disabled={!secretPhrase}
              className="crypto-button w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 px-4 py-2 rounded text-white font-mono"
              style={{ color: '#3b82f6' }}
            >
              Create Wallet
            </button>
          </CardContent>
        </Card>

        {wallet && (
          <div className="mt-8">
            <WalletCard 
              publicKey={wallet.publicKey}
              privateKey={wallet.privateKey}
              network="Ethereum"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ethereum;
