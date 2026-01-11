import React from "react";
import { motion } from "framer-motion";
import { 
    GraduationCap, 
    FileCheck, 
    CreditCard, 
    Headphones, 
    Compass, 
    PieChart 
} from "lucide-react";

const Services = () => {
    const serviceData = [
        {
            id: 1,
            title: "Scholarship Matching",
            description: "Advanced algorithms to pair your profile with the most compatible funding opportunities globally.",
            icon: <GraduationCap />,
        },
        {
            id: 2,
            title: "Application Review",
            description: "Expert analysis of your documents to ensure maximum compliance with university requirements.",
            icon: <FileCheck />,
        },
        {
            id: 3,
            title: "Seamless Payments",
            description: "Industry-standard secure gateways for handling application and tuition fees with complete transparency.",
            icon: <CreditCard />,
        },
        {
            id: 4,
            title: "Strategic Guidance",
            description: "Step-by-step roadmaps to help you navigate through complex international admission cycles.",
            icon: <Compass />,
        },
        {
            id: 5,
            title: "Success Analytics",
            description: "Comprehensive data insights and tracking of your application progress through a dedicated portal.",
            icon: <PieChart />,
        },
        {
            id: 6,
            title: "Dedicated Support",
            description: "Priority 24/7 technical and administrative assistance for a smooth scholarship journey.",
            icon: <Headphones />,
        },
    ];

    return (
        <section className="py-24 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Area */}
                <div className="text-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block bg-primary/10 text-primary border border-primary/20 px-5 py-1.5 rounded-full mb-6"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Our Expertise</span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-7xl font-black text-neutral italic uppercase tracking-tighter leading-none mb-6">
                        Elite Solutions For <br />
                        <span className="text-primary decoration-4 underline-offset-8">Global Education</span>
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
                    {serviceData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Icon Box */}
                            <div className="mb-8 relative flex justify-center md:justify-start">
                                <div className="w-20 h-20 bg-base-200 border border-base-300 flex items-center justify-center rounded-[2rem] text-neutral group-hover:bg-neutral group-hover:text-base-100 transition-all duration-500 shadow-xl group-hover:-rotate-12">
                                    {React.cloneElement(service.icon, { size: 32, strokeWidth: 2.5 })}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="space-y-4 text-center md:text-left">
                                <h3 className="text-2xl font-black text-neutral italic uppercase tracking-tight group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <div className="w-12 h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mx-auto md:mx-0"></div>
                                <p className="text-neutral/60 text-[11px] font-bold uppercase tracking-widest leading-relaxed italic">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;