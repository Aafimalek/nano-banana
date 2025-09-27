import React from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Creative Director",
        company: "Design Studio Pro",
        content: "Morphic has completely transformed our creative workflow. The AI-powered tools save us hours of work while delivering stunning results that our clients love.",
        avatar: "/api/placeholder/60/60",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Marketing Manager",
        company: "TechStart Inc",
        content: "The isometric illustrations feature is incredible. We can now create professional graphics in minutes instead of hours. It's a game-changer for our marketing campaigns.",
        avatar: "/api/placeholder/60/60",
        rating: 5
    },
    {
        name: "Emily Rodriguez",
        role: "Freelance Designer",
        company: "Independent",
        content: "As a freelancer, I need tools that help me deliver high-quality work quickly. Morphic's text behind images tool has become an essential part of my toolkit.",
        avatar: "/api/placeholder/60/60",
        rating: 5
    },
    {
        name: "David Thompson",
        role: "Brand Manager",
        company: "Global Brands Co",
        content: "The diagram generation feature is outstanding. It helps us create complex flowcharts and presentations that would normally take days to complete.",
        avatar: "/api/placeholder/60/60",
        rating: 5
    },
    {
        name: "Lisa Wang",
        role: "Content Creator",
        company: "Digital Media Agency",
        content: "Morphic's outfit replacement tool is revolutionary for fashion content. It allows us to create multiple variations of product shots without expensive photoshoots.",
        avatar: "/api/placeholder/60/60",
        rating: 5
    },
    {
        name: "Alex Martinez",
        role: "Startup Founder",
        company: "InnovateLab",
        content: "We use Morphic for all our visual content needs. The quality is professional-grade and the speed is unmatched. It's like having a full design team at our fingertips.",
        avatar: "/api/placeholder/60/60",
        rating: 5
    }
];


export const TestimonialSection: React.FC = () => {
    return (
        <section className="py-20 bg-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#ededed] mb-6">
                        What Our Users Say
                    </h2>
                    <p className="text-xl text-[#a1a1a1] max-w-3xl mx-auto">
                        Join thousands of creators, designers, and marketers who trust Morphic for their creative needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-[#0a0a0a]/30 to-[#ededed]/10 border border-[#a1a1a1]/20 rounded-2xl p-8 hover:border-[#3758c9]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#3758c9]/10"
                        >
                            <div className="flex items-center mb-6">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full border-2 border-[#a1a1a1]/20"
                                />
                                <div className="ml-4">
                                    <h4 className="text-[#ededed] font-semibold text-lg">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-[#a1a1a1] text-sm">
                                        {testimonial.role} at {testimonial.company}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <React.Fragment key={i}>
                                        <FaStar size={20} color="#e8704e" />
                                    </React.Fragment>
                                ))}
                            </div>

                            <blockquote className="text-[#a1a1a1] text-base leading-relaxed">
                                "{testimonial.content}"
                            </blockquote>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-[#ededed]">1K+</div>
                        <div className="text-[#a1a1a1]">Visitors</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-[#ededed]">200+</div>
                        <div className="text-[#a1a1a1]">Images Generated</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-bold text-[#ededed]">99.9%</div>
                        <div className="text-[#a1a1a1]">Uptime</div>
                    </div>
                    {/* <div className="space-y-2">
                        <div className="text-4xl font-bold text-[#ededed]">4.9/5</div>
                        <div className="text-[#a1a1a1]"></div>
                    </div> */}
                </div>
            </div>
        </section>
    );
};
