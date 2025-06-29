
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
            <button
              onClick={() => copyToClipboard(privateKey, 'private')}
              className="crypto-button text-xs h-6 px-2 hover:bg-white/10 bg-transparent border border-white/20 rounded text-white"
              style={{ color: buttonColor }}
            >
              {copiedPrivate ? 'Copied!' : 'Copy'}
            </button>
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
