
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface WalletCardProps {
  publicKey: string;
  privateKey: string;
  network: string;
}

const WalletCard = ({ publicKey, privateKey, network }: WalletCardProps) => {
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedPrivate, setCopiedPrivate] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const copyToClipboard = async (text: string, type: 'public' | 'private') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'public') {
        setCopiedPublic(true);
        setTimeout(() => setCopiedPublic(false), 2000);
      } else {
        setCopiedPrivate(true);
        setTimeout(() => setCopiedPrivate(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleRevealPrivateKey = () => {
    if (password === 'reveal') {
      setShowPrivateKey(true);
      setIsDialogOpen(false);
      setPassword('');
    } else {
      alert('Incorrect password! Hint: type "reveal"');
    }
  };

  const togglePrivateKeyVisibility = () => {
    if (showPrivateKey) {
      setShowPrivateKey(false);
    } else {
      setIsDialogOpen(true);
    }
  };

  const maskPrivateKey = (key: string) => {
    if (key.length <= 8) return '•'.repeat(key.length);
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  const buttonColor = network === 'Ethereum' ? '#8b5cf6' : '#06b6d4';
  const cardTheme = network === 'Ethereum' ? 'ethereum-theme' : 'solana-theme';

  return (
    <Card className={`wallet-card ${cardTheme} text-white font-mono`}>
      <CardHeader>
        <CardTitle className="text-xl text-center">{network} Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm opacity-80">Public Key</h3>
            <button
              onClick={() => copyToClipboard(publicKey, 'public')}
              className="crypto-button text-xs h-6 px-2 hover:bg-white/10 bg-transparent border border-white/20 rounded text-white"
              style={{ color: buttonColor }}
            >
              {copiedPublic ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="bg-black/20 rounded-lg p-3 font-mono text-sm break-all">
            {publicKey}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm opacity-80">Private Key</h3>
            <div className="flex gap-2">
              <button
                onClick={togglePrivateKeyVisibility}
                className="crypto-button text-xs h-6 px-2 hover:bg-white/10 bg-transparent border border-white/20 rounded text-white flex items-center gap-1"
                style={{ color: buttonColor }}
              >
                {showPrivateKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showPrivateKey ? 'Hide' : 'Show'}
              </button>
              {showPrivateKey && (
                <button
                  onClick={() => copyToClipboard(privateKey, 'private')}
                  className="crypto-button text-xs h-6 px-2 hover:bg-white/10 bg-transparent border border-white/20 rounded text-white"
                  style={{ color: buttonColor }}
                >
                  {copiedPrivate ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
          <div className="bg-black/20 rounded-lg p-3 font-mono text-sm break-all">
            {showPrivateKey ? privateKey : maskPrivateKey(privateKey)}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          <p className="text-xs text-yellow-200">
            ⚠️ Keep your private key secure! Never share it with anyone.
          </p>
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Enter Password to Reveal Private Key</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              This will reveal your private key. Please enter the password to continue.
            </p>
            <Input
              type="password"
              placeholder="Enter password (hint: 'reveal')"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleRevealPrivateKey()}
            />
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRevealPrivateKey}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Reveal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WalletCard;
