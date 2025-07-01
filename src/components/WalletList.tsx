import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Wallet {
  id: number;
  publicKey: string;
  privateKey: string;
}

interface WalletListProps {
  wallets: Wallet[];
  network: string;
  secretPhrase: string;
  password: string;
  setPassword: (p: string) => void;
  onClearWallets: () => void;
  onAddWallet: () => void;
  onRemoveWallet: (id: number) => void;
}

const WalletList = ({
  wallets,
  network,
  secretPhrase,
  password,
  setPassword,
  onClearWallets,
  onAddWallet,
  onRemoveWallet,
}: WalletListProps) => {
  const [isSecretPhraseOpen, setIsSecretPhraseOpen] = useState(false);
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<Set<number>>(
    new Set()
  );
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingKeyId, setPendingKeyId] = useState<number | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const removeWallets = (id: number) => {
    onRemoveWallet(id);
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems((prev) => new Set([...prev, id]));
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleRevealPrivateKey = (walletId: number) => {
    setPendingKeyId(walletId);
    setIsDialogOpen(true);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === password && pendingKeyId !== null) {
      setVisiblePrivateKeys((prev) => new Set([...prev, pendingKeyId]));
      setIsDialogOpen(false);
    } else {
      alert("Incorrect password!");
    }
    setPasswordInput(""); // Always clear input after submit
  };

  const togglePrivateKeyVisibility = (walletId: number) => {
    if (visiblePrivateKeys.has(walletId)) {
      setVisiblePrivateKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(walletId);
        return newSet;
      });
    } else {
      handleRevealPrivateKey(walletId);
    }
  };

  const maskPrivateKey = (key: string) => {
    if (key.length <= 8) return "•".repeat(key.length);
    return "•".repeat(key.length);
  };

  const buttonColor = network === "Ethereum" ? "#8b5cf6" : "#06b6d4";

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-white">{network} Wallet</h1>
        <div className="flex gap-2">
          <button
            onClick={onAddWallet}
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-all duration-200 text-sm hover:scale-105"
          >
            Add Wallet
          </button>
          <button
            onClick={onClearWallets}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-200 text-sm hover:scale-105"
          >
            Clear Wallets
          </button>
        </div>
      </div>

      {/* Secret Phrase Section */}
      <Card className="glassmorphism text-white border-white/20 mb-6 transition-all duration-300">
        <CardHeader
          className="cursor-pointer flex flex-row items-center justify-between py-4 transition-colors duration-200 hover:bg-white/5"
          onClick={() => setIsSecretPhraseOpen(!isSecretPhraseOpen)}
        >
          <CardTitle className="text-base">Your Secret Phrase</CardTitle>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${
              isSecretPhraseOpen ? "rotate-180" : ""
            }`}
          />
        </CardHeader>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSecretPhraseOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <CardContent className="pt-0 pb-4">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {secretPhrase.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="bg-black/30 rounded px-3 py-2 text-center text-sm font-mono transition-colors duration-200 hover:bg-black/40"
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
                onClick={() => copyToClipboard(secretPhrase, "secret-phrase")}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                {copiedItems.has("secret-phrase") ? "Copied!" : "Copy All"}
              </button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Wallets List */}
      <div className="space-y-4">
        {wallets.map((wallet, index) => (
          <Card
            key={wallet.id}
            className="glassmorphism text-white border-white/20 animate-fade-in transition-all duration-200 hover:bg-white/5"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-base">Wallet {wallet.id}</CardTitle>
              <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
                <Trash2
                  className="w-4 h-4"
                  onClick={() => removeWallets(wallet.id)}
                />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Public Key */}
              <div>
                <h3 className="text-sm text-gray-300 mb-2">Public Key</h3>
                <div className="bg-black/30 rounded p-3 font-mono text-sm break-all transition-colors duration-200 hover:bg-black/40">
                  {wallet.publicKey}
                </div>
              </div>

              {/* Private Key */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm text-gray-300">Private Key</h3>
                  <button
                    onClick={() => togglePrivateKeyVisibility(wallet.id)}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-white/20 hover:bg-white/10 transition-all duration-200"
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
                <div className="bg-black/30 rounded p-3 font-mono text-sm break-all transition-colors duration-200 hover:bg-black/40">
                  {visiblePrivateKeys.has(wallet.id)
                    ? wallet.privateKey
                    : maskPrivateKey(wallet.privateKey)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Password Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setPasswordInput("");
            setPendingKeyId(null);
          }
        }}
      >
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Enter Password to Reveal Private Key</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              This will reveal your private key. Please enter the password to
              continue.
            </p>
            <Input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              onKeyPress={(e) => e.key === "Enter" && handlePasswordSubmit()}
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
