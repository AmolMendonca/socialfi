import { Wallet, Twitter, Shield, Globe, Zap, Users, ArrowRight } from 'lucide-react';

const About = () => {
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
              <button className="text-purple-600 font-medium text-sm">
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

      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Making Crypto
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 inline-block text-transparent bg-clip-text mx-2">
                Social
              </span>
              &
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 inline-block text-transparent bg-clip-text ml-2">
                Simple
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              We're bridging the gap between social media and cryptocurrency, making digital assets accessible to everyone.
            </p>
          </div>

          {/* Mission Statement */}
          {/* <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16"> */}
            {/* <div className="p-8 sm:p-10"> */}
              {/* <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h2> */}
              <div className="prose prose-purple max-w-none">
                {/* <p className="text-gray-600 leading-relaxed">
                  SocialFi was born from a simple observation: while social media connects billions of people, 
                  cryptocurrency remains complex and intimidating for many. We're changing that by creating a 
                  bridge between these two worlds, allowing anyone to send and receive crypto using just their 
                  social media identity.
                </p> */}
              </div>
            {/* </div> */}
          {/* </div> */}

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Security First",
                description: "Non-custodial wallets with social recovery options keep your assets safe"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instant Setup",
                description: "Create a wallet in seconds using your existing social media account"
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Community Driven",
                description: "Built for and by the community, with transparent operations"
              },
              {
                icon: <Twitter className="w-6 h-6" />,
                title: "Social Integration",
                description: "Seamlessly connect with your existing social network"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-xl">
                    <div className="text-purple-600">{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section
          <div className="bg-purple-600 rounded-3xl shadow-xl overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-purple-500">
              {[
                { number: "100K+", label: "Active Users" },
                { number: "$10M+", label: "Total Volume" },
                { number: "150+", label: "Countries" }
              ].map((stat, i) => (
                <div key={i} className="p-8 text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-purple-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
 */}
          {/* CTA Section */}
          <div className="text-center">
            <button className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25 active:scale-95">
              Start Sending Crypto
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;