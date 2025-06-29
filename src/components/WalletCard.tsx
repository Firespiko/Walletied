
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface WalletCardProps {
  publicKey: string;
  privateKey: string;
  network: string;
}

const WalletCard = ({ publicKey, privateKey, network }: WalletCardProps) => {
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedPrivate, setCopiedPrivate] = useState(false);

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

  return (
    <Card className="wallet-card text-white">
      <CardHeader>
        <CardTitle className="text-xl text-center">{network} Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm opacity-80">Public Key</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(publicKey, 'public')}
              className="text-xs h-6 px-2 hover:bg-white/10"
            >
              {copiedPublic ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-black/20 rounded-lg p-3 font-mono text-sm break-all">
            {publicKey}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm opacity-80">Private Key</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(privateKey, 'private')}
              className="text-xs h-6 px-2 hover:bg-white/10"
            >
              {copiedPrivate ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-black/20 rounded-lg p-3 font-mono text-sm break-all">
            {privateKey}
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          <p className="text-xs text-yellow-200">
            ⚠️ Keep your private key secure! Never share it with anyone.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
