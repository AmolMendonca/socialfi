import { useState, useEffect } from 'react';
import { 
  Twitter, 
  Wallet, 
  Gift, 
  Shield, 
  Key,
  Bell,
  Lock,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

const HowItWorks = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      icon: <Twitter className="w-6 h-6" />,
      title: "Enter Social Handle",
      description: "Simply enter your friend's Twitter handle - no complex wallet addresses needed. We'll verify it instantly through Twitter's API."
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Wallet Creation",
      description: "We automatically generate a secure, non-custodial wallet for the recipient. The wallet is uniquely tied to their social identity."
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Send Crypto",
      description: "Deposit crypto or use our fiat on-ramp to send funds. The recipient's wallet is ready instantly for the transfer."
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Notification",
      description: "The recipient gets notified via Twitter DM about their new wallet and funds, with simple instructions to claim them."
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Non-Custodial Security",
      description: "Recipients have full control of their wallets. We never store private keys - they're generated deterministically using secure OAuth tokens."
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Social Authentication",
      description: "Simple and secure access through Twitter OAuth verification. No seed phrases to remember or store."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Built on Base L2",
      description: "Powered by Coinbase's Base network for fast, low-cost transactions with enterprise-grade security."
    }
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-200 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className={`bg-white/70 backdrop-blur-md shadow-sm border rounded-2xl transition-all duration-200`}>
            <div className="h-16 flex items-center justify-between px-6">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => window.history.back()} 
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Back</span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="bg-white p-1.5 rounded-xl shadow-sm">
                    <Wallet className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">SocialFi</span>
                </div>
              </div>
              <nav className="flex items-center space-x-8">
                <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  About
                </button>
                <button className="text-purple-600 font-medium text-sm transition-colors">
                  How it Works
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25 active:scale-95">
                  Connect Wallet
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <div className="pb-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Onboarding Made 
            <span className="bg-gradient-to-r from-purple-600 to-purple-400 inline-block text-transparent bg-clip-text ml-2">
              Simple
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We've simplified the crypto onboarding process into a few easy steps. No technical knowledge required - just share, send, and your friends are ready to go.
          </p>
        </div>

        {/* Interactive Steps Section */}
        <div className="max-w-6xl mx-auto px-4 mb-24">
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i}>
                <div 
                  onClick={() => handleStepClick(i)}
                  className={`bg-white rounded-2xl p-6 h-full shadow-lg cursor-pointer transition-all duration-300
                    ${activeStep === i 
                      ? 'ring-2 ring-purple-500 shadow-purple-500/20' 
                      : 'hover:shadow-purple-500/20'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                    ${activeStep === i ? 'bg-purple-600 text-white scale-110' : 'bg-purple-100 text-purple-600'}`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Enterprise-Grade Security
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {features.map((feature, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400">
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px_16px]" />
          </div>
          <div className="relative">
            <div className="max-w-4xl mx-auto px-4 py-20">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Share the Power of Crypto?
                </h2>
                <p className="text-purple-100 text-lg mb-12 max-w-2xl mx-auto">
                  Start sending crypto to your friends using just their Twitter handle. No technical setup required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all hover:shadow-purple-500/25 active:scale-95 w-full sm:w-auto">
                    Get Started Now
                  </button>
                  <button className="bg-purple-500/20 text-white border border-purple-200/20 px-8 py-4 rounded-xl font-medium hover:bg-purple-500/30 transition-all w-full sm:w-auto">
                    Watch Demo
                    <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;