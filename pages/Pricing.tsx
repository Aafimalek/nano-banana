import React from 'react';

const plans = [
    {
        name: 'Basic',
        price: '$0',
        discountedPrice: '$3',
        period: '/mo',
        tagline: 'Get started with essentials',
        features: [
            '5 generations/day',
            'Standard quality',
            'Community support'
        ],
        cta: 'Start Free',
        accent: 'from-gray-600 to-gray-700'
    },
    {
        name: 'Balanced',
        price: '$10',
        discountedPrice: '$12',
        period: '/mo',
        tagline: 'Great value for creators',
        features: [
            '200 generations/mo',
            'HD quality outputs',
            'Priority processing',
            'Email support'
        ],
        cta: 'Choose Balanced',
        accent: 'from-gray-600 to-gray-700'
    },
    {
        name: 'Advanced',
        price: '$25',
        discountedPrice: '$29',
        period: '/mo',
        tagline: 'Power for professionals',
        features: [
            'Unlimited generations',
            '4K quality outputs',
            'Fastest processing',
            'Commercial usage'
        ],
        cta: 'Go Advanced',
        accent: 'from-gray-600 to-gray-700'
    }
];

export const Pricing: React.FC = () => {
    return (
        <section>
            <header className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#ededed]">Pricing</h1>
                <p className="mt-4 text-lg text-[#a1a1a1]">Flexible plans that scale with your creativity.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, idx) => (
                    <div key={plan.name} className={`flex flex-col justify-between border border-[#a1a1a1]/20 rounded-2xl p-8 hover:border-[#3758c9]/70 transition-all duration-300 hover:shadow-2xl hover:shadow-[#3758c9]/10 bg-gradient-to-br from-[#ededed]/10 to-[#0a0a0a]/10`}>
                        {/* <div className="absolute -inset-x-6 -top-6 h-24 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl rounded-full bg-gradient-to-r from-[#3758c9]/15 via-[#43b6f0]/15 to-[#7130d1]/15" /> */}
                        <h3 className="text-2xl font-extrabold text-[#ededed]">{plan.name}</h3>
                        <p className="mt-1 text-[#a1a1a1]">{plan.tagline}</p>
                        <div className="mt-6 flex items-end gap-1">
                            <span className="text-4xl font-extrabold text-[#ededed]">{plan.price}</span>
                            <span className="text-[#a1a1a1] font-semibold line-through">{plan.discountedPrice}</span>
                            <span className="text-[#a1a1a1] font-semibold">{plan.period}</span>
                        </div>
                        <ul className="mt-6 space-y-3 text-[#a1a1a1]">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-center gap-2">
                                    <span className={`h-1.5 w-1.5 rounded-full bg-[#3758c9] shadow-[0_0_12px_rgba(55,88,201,0.7)]`}></span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-8 relative inline-flex w-full items-center justify-center px-4 py-2 rounded-full text-[#ededed] font-semibold transition-all duration-500 ease-in-out bg-gradient-to-r from-[#0090ff]/20 to-[#7130d1]/20 hover:from-[#0090ff]/30 hover:to-[#7130d1]/30">
                            {/* <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${plan.accent} opacity-90`}></span> */}
                            {/* <span className={`absolute -inset-1 rounded-full blur-md bg-gradient-to-r ${plan.accent} opacity-60`}></span> */}
                            <span className="relative">{plan.cta}</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};


