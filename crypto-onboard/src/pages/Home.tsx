import { useState } from 'react';
import { Twitter, Wallet, ArrowRight, Gift, ChevronRight, Copy, Send, Plus, ExternalLink } from 'lucide-react';

const Home = () => {
  const [step, setStep] = useState(1);
  const [twitterHandle, setTwitterHandle] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleContinue = async () => {
    try {
      // Remove any leading '@' from the handle if present
      const handle = twitterHandle.startsWith('@') ? twitterHandle.slice(1) : twitterHandle;

      const response = await fetch('http://localhost:5001/api/createWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ twitterHandle: handle }),
      });

      if (!response.ok) {
        console.error('Error creating wallet:', response.statusText);
        return;
      }

      const data = await response.json();
      setWalletAddress(data.address);
      setStep(2);
    } catch (error) {
      console.error('Error in handleContinue:', error);
    }
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-4 z-50 mx-auto max-w-3xl px-4">
        <div className="bg-white/70 backdrop-blur-md shadow-sm border rounded-2xl">
          <div className="h-16 flex items-center justify-between px-6">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1.5 rounded-xl shadow-sm">
                <Wallet className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">SocialFi</span>
            </div>
            <nav className="flex items-center space-x-8">
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                About
              </button>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                How it Works
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25 active:scale-95">
                Connect Wallet
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gift Crypto to Anyone Using
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 inline-block text-transparent bg-clip-text ml-2">
                Social Media
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              No wallet? No problem. Send crypto to your friends using just their Twitter handle - we'll handle the rest.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <div className="bg-purple-50 px-8 py-4 flex justify-center gap-8 text-sm border-b">
              {['Enter Handle', 'Set Amount', 'Confirm'].map((label, i) => (
                <div key={i} className="flex items-center">
                  <div className={`flex items-center ${i + 1 === step ? 'text-purple-600' : 'text-gray-400'}`}>
                    <span className="mr-2">{i + 1}</span>
                    <span>{label}</span>
                  </div>
                  {i < 2 && <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-8">
              {step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient's Twitter Handle
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Twitter className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        placeholder="@username"
                        value={twitterHandle}
                        onChange={(e) => setTwitterHandle(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleContinue}
                    disabled={!twitterHandle.trim()}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 font-medium transition-all flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Wallet Display */}
                  <div className="text-center">
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-600">Wallet created for</span>
                      <h3 className="text-xl font-semibold text-gray-900">{twitterHandle}</h3>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <div className="flex items-center justify-center space-x-2">
                        <code className="text-purple-700 font-mono">{truncateAddress(walletAddress)}</code>
                        <button 
                          onClick={handleCopyAddress}
                          className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4 text-purple-600" />
                        </button>
                      </div>
                      {copySuccess && (
                        <span className="text-sm text-purple-600 mt-1 block">Address copied!</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors font-medium">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Funds
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium">
                      <Send className="w-4 h-4 mr-2" />
                      Share Wallet
                    </button>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">What happens next?</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          You can now add funds to this wallet or share it with {twitterHandle}. They'll be able to access their funds using their Twitter account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-3 gap-8">
            {[
              {
                icon: <Gift className="w-5 h-5" />,
                title: "Easy Gifting",
                description: "Send crypto using just a Twitter handle"
              },
              {
                icon: <Wallet className="w-5 h-5" />,
                title: "Non-custodial",
                description: "Recipients control their wallets"
              },
              {
                icon: <Twitter className="w-5 h-5" />,
                title: "Social First",
                description: "Seamless social integration"
              }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-purple-600">{feature.icon}</div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;