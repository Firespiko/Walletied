
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WalletCard from '@/components/WalletCard';
import { generateSolanaWallet } from '@/lib/solana';
import { ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Solana = () => {
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
    const newWallet = generateSolanaWallet(secretPhrase);
    setWallet(newWallet);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-blue-600 p-8">
      <Button 
        onClick={() => navigate('/')}
        className="mb-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
      >
        <ArrowUp className="w-4 h-4 mr-2 rotate-[-45deg]" />
        Back to Home
      </Button>

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
                className="bg-white/10 border-blue-400/30 text-white placeholder:text-white/60"
              />
            </div>

            <Button 
              onClick={handleGeneratePhrase}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Generate Secret Phrase
            </Button>

            <div className="space-y-2">
              <Label htmlFor="password">Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-white/10 border-blue-400/30 text-white placeholder:text-white/60"
              />
            </div>

            <Button 
              onClick={handleCreateWallet}
              disabled={!secretPhrase}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 shadow-lg shadow-blue-500/25"
            >
              Create Wallet
            </Button>
          </CardContent>
        </Card>

        {wallet && (
          <div className="mt-8">
            <WalletCard 
              publicKey={wallet.publicKey}
              privateKey={wallet.privateKey}
              network="Solana"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Solana;
