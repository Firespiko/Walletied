# 💼 Walletied

**Walletied** is a sleek and secure wallet generator for both **Solana** and **Ethereum** networks. Built with performance, user experience, and security in mind, Walletied uses modern libraries like **ShadCN UI**, **Tailwind CSS**, **React Hook Form**, and cryptographic primitives like **ethers.js**, **@solana/web3.js**, and **bip39** to generate fully client-side, non-custodial wallets.

> 🔒 Your keys never leave your device.

---

## ⚡ Features

- 🔑 Generate Solana and Ethereum wallets securely in the browser
- 🧠 BIP39 Mnemonic phrase generation
- 👁️ Reveal/hide private keys with password gating
- 📋 Copy public/private keys or secret phrase
- 🧼 Clear all wallets with one click
- ➕ Add new wallets dynamically
- 🎨 Beautiful glassmorphic UI with light/dark theme support

---

## 🛠️ Tech Stack

| Layer           | Technology                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| Frontend        | [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)                                                  |
| UI Framework    | [ShadCN UI](https://ui.shadcn.com/) + [TailwindCSS](https://tailwindcss.com/)                                |
| Form Handling   | [React Hook Form](https://react-hook-form.com/)                                                              |
| Ethereum        | [ethers.js](https://docs.ethers.org/v6/)                                                                     |
| Solana          | [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)                                             |
| Mnemonic        | [bip39](https://www.npmjs.com/package/bip39), [ed25519-hd-key](https://www.npmjs.com/package/ed25519-hd-key) |
| Clipboard Utils | [lucide-react](https://lucide.dev/icons), [bs58](https://github.com/cryptocoinjs/bs58)                       |
| Dialog/Access   | [@radix-ui/react-dialog](https://www.radix-ui.com/primitives/docs/components/dialog)                         |
| Validation      | [zod](https://github.com/colinhacks/zod)                                                                     |

---

## 🚀 Getting Started

### 1. Clone the repository

````bash
git clone https://github.com/your-username/walletied.git
cd walletied


2. Install dependencies
```bash
npm install
# or
yarn
````

3. Run development server

```bash
npm run dev
```

Visit http://localhost:5173 to use the app.

## 📦 Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```bash
src/
│
├── components/      # UI Components (shadcn based)
├── pages/           # Routes
├── lib/             # Wallet generation, encryption utils
├── hooks/           # Custom hooks
└── styles/          # Tailwind and global styles
```

## 🧠 Wallet Generation

**Ethereum**:

Uses `ethers.Wallet.createRandom()` to derive keys from BIP39 mnemonic

**Solana**:

Uses `bip39` + `ed25519-hd-key` to derive seed → keypair with `@solana/web3.js`

## 🔐 Security Notes

- Wallets and keys are stored in memory (not persisted)
- Password gating is used before revealing private keys
- No external API call is made — it's fully client-side

## 📌 Future Roadmap

- Export wallet to Keystore / JSON
- Integrate with Metamask / Phantom for import
- Encrypt wallets with password + localStorage
- Mobile-first responsive enhancements

## 🧑‍💻 Author

K.S. Adithya – [@ksadithya](https://github.com/ksadithya)

## 📄 License

MIT
