
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Wallet {
  id: number;
  publicKey: string;
  privateKey: string;
}

interface WalletListProps {
  wallets: Wallet[];
  network: string;
  secretPhrase: string;
  onClearWallets: () => void;
  onAddWallet: () => void;
}

const WalletList = ({ wallets, network, secretPhrase, onClearWallets, onAddWallet }: WalletListProps) => {
  const [isSecretPhraseOpen, setIsSecretPhraseOpen] = useState(false);
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<Set<number>>(new Set());
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingKeyId, setPendingKeyId] = useState<number | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, id]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleRevealPrivateKey = (walletId: number) => {
    setPendingKeyId(walletId);
    setIsDialogOpen(true);
  };

  const handlePasswordSubmit = () => {
    if (password === 'reveal' && pendingKeyId !== null) {
      setVisiblePrivateKeys(prev => new Set([...prev, pendingKeyId]));
      setIsDialogOpen(false);
      setPassword('');
      setPendingKeyId(null);
    } else {
      alert('Incorrect password! Hint: type "reveal"');
    }
  };

  const togglePrivateKeyVisibility = (walletId: number) => {
    if (visiblePrivateKeys.has(walletId)) {
      setVisiblePrivateKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(walletId);
        return newSet;
      });
    } else {
      handleRevealPrivateKey(walletId);
    }
  };

  const maskPrivateKey = (key: string) => {
    if (key.length <= 8) return '•'.repeat(key.length);
    return '•'.repeat(key.length);
  };

  const buttonColor = network === 'Ethereum' ? '#8b5cf6' : '#06b6d4';

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">{network} Wallet</h1>
        <div className="flex gap-2">
          <button
            onClick={onAddWallet}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors text-sm"
          >
            Add Wallet
          </button>
          <button
            onClick={onClearWallets}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
          >
            Clear Wallets
          </button>
        </div>
      </div>

      {/* Secret Phrase Section */}
      <Card className="glassmorphism text-white border-white/20 mb-6">
        <CardHeader 
          className="cursor-pointer flex flex-row items-center justify-between py-4"
          onClick={() => setIsSecretPhraseOpen(!isSecretPhraseOpen)}
        >
          <CardTitle className="text-lg">Your Secret Phrase</CardTitle>
          <ChevronDown 
            className={`w-5 h-5 transition-transform ${isSecretPhraseOpen ? 'rotate-180' : ''}`}
          />
        </CardHeader>
        {isSecretPhraseOpen && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {secretPhrase.split(' ').map((word, index) => (
                <div 
                  key={index}
                  className="bg-black/30 rounded px-3 py-2 text-center text-sm font-mono"
                >
                  {word}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 flex items-center">
                <Copy className="w-3 h-3 mr-1" />
                Click Anywhere To Copy
              </span>
              <button
                onClick={() => copyToClipboard(secretPhrase, 'secret-phrase')}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                {copiedItems.has('secret-phrase') ? 'Copied!' : 'Copy All'}
              </button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Wallets List */}
      <div className="space-y-4">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="glassmorphism text-white border-white/20">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-lg">Wallet {wallet.id}</CardTitle>
              <button className="text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Public Key */}
              <div>
                <h3 className="text-sm text-gray-300 mb-2">Public Key</h3>
                <div className="bg-black/30 rounded p-3 font-mono text-sm break-all">
                  {wallet.publicKey}
                </div>
              </div>

              {/* Private Key */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm text-gray-300">Private Key</h3>
                  <button
                    onClick={() => togglePrivateKeyVisibility(wallet.id)}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-white/20 hover:bg-white/10"
                    style={{ color: buttonColor }}
                  >
                    {visiblePrivateKeys.has(wallet.id) ? (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" />
                        Show
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-black/30 rounded p-3 font-mono text-sm break-all">
                  {visiblePrivateKeys.has(wallet.id) ? wallet.privateKey : maskPrivateKey(wallet.privateKey)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Password Dialog */}
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
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
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
                onClick={handlePasswordSubmit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Reveal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletList;
