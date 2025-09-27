import React from 'react'
import { Link } from 'react-router-dom';
import { ToolId } from '../types';
import { FaLinkedin, FaGithub, FaReddit, FaYoutube, FaGlobe, FaShieldAlt } from "react-icons/fa";

const toolData: { id: ToolId; label: string }[] = [
    { id: 'textImage', label: 'Text Behind Images' },
    { id: 'isometry', label: 'Isometry' },
    { id: 'outfitReplace', label: 'Replace Outfit' },
    { id: 'diagram', label: 'Diagrams' },
];

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#1a1a1a] border-t-2 border-[#a1a1a1]/20">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-6xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* Contact & Social */}
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <p className="text-[#ededed] text-lg hover:underline">morphic.com</p>
                                <div className="flex space-x-4">
                                    <FaLinkedin size={25} color="#a1a1a1" />
                                    <FaGithub size={25} color="#a1a1a1" />
                                    <FaYoutube size={25} color="#a1a1a1" />
                                </div>
                            </div>
                        </div>

                        {/* Product */}
                        <div>
                            <h3 className="text-[#ededed] font-semibold text-sm mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">Home</Link></li>
                                <li><Link to="/pricing" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">Pricing</Link></li>
                                <li><Link to="/tools" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">Tools</Link></li>
                                <li><Link to="/about" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">About</Link></li>
                                <li><Link to="/contact" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-[#ededed] font-semibold text-sm mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">About</Link></li>
                                <li><Link to="/contact" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-[#ededed] font-semibold text-sm mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link to="/terms" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">Terms</Link></li>
                                <li><Link to="/privacy" className="text-[#a1a1a1] hover:text-[#ededed] text-sm transition-colors hover:underline">Privacy</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-[#a1a1a1] text-sm">
                            © {year} Made by Morphic
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};