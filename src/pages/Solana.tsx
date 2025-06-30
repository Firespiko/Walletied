
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WalletList from '@/components/WalletList';
import { generateSolanaWallet } from '@/lib/solana';
import { ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Wallet {
  id: number;
  publicKey: string;
  privateKey: string;
}

const Solana = () => {
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
    const newWallet = generateSolanaWallet(secretPhrase);
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
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-600 p-8 font-mono">
      <button 
        onClick={() => navigate('/')}
        className="crypto-button mb-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded text-white flex items-center"
        style={{ color: '#06b6d4' }}
      >
        <ArrowUp className="w-4 h-4 mr-2 rotate-[-45deg]" />
        Back to Home
      </button>

      {wallets.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-12 tracking-wide">
            Solana Wallet Generator
          </h1>

          <Card className="glassmorphism text-white border-blue-400/30 shadow-lg shadow-blue-500/20">
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
                  className="bg-white/10 border-blue-400/30 text-white placeholder:text-white/60 font-mono"
                />
              </div>

              <button 
                onClick={handleGeneratePhrase}
                className="crypto-button w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-mono"
                style={{ color: '#06b6d4' }}
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
                  className="bg-white/10 border-blue-400/30 text-white placeholder:text-white/60 font-mono"
                />
              </div>

              <button 
                onClick={handleCreateWallet}
                disabled={!secretPhrase}
                className="crypto-button w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 shadow-lg shadow-blue-500/25 px-4 py-2 rounded text-white font-mono"
                style={{ color: '#06b6d4' }}
              >
                Create Wallet
              </button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <WalletList
          wallets={wallets}
          network="Solana"
          secretPhrase={secretPhrase}
          onClearWallets={handleClearWallets}
          onAddWallet={handleAddWallet}
        />
      )}
    </div>
  );
};

export default Solana;
