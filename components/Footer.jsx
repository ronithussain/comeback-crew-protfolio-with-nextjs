import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXRay } from "react-icons/fa";


const FooterPage = () => {
    const current_year = new Date().getFullYear();
    return (

        <div>
            <hr className='text-gray-300' />
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 px-6">
                {/* Footer Text */}
                <div>
                    <h3 className="text-center my-4 text-[#a91564] sm:text-xl text-base">
                        All Rights Reserved - {current_year}
                    </h3>
                </div>

                {/* Social Icons */}
                <div className="flex items-center space-x-4">
                    <a
                        href="https://x.com/ZainHussai99859"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaXRay className="text-white sm:text-3xl text-xl bg-gray-800 p-1.5 rounded-full hover:bg-[#A91F64] transition duration-500" />
                    </a>
                    <a
                        href="https://www.facebook.com/zain.hussain.317274?mibextid=JRoKGi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebookF className="text-white sm:text-3xl text-xl bg-gray-800 p-1.5 rounded-full hover:bg-[#A91F64] transition duration-500" />
                    </a>
                    <a
                        href="https://www.instagram.com/invites/contact/?igsh=ehc5d06duq73&utm_content=dwbztt4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram className="text-white sm:text-3xl text-xl bg-gray-800 p-1.5 rounded-full hover:bg-[#A91F64] transition duration-500" />
                    </a>
                    <a
                        href="https://www.instagram.com/invites/contact/?igsh=ehc5d06duq73&utm_content=dwbztt4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedinIn className="text-white sm:text-3xl text-xl bg-gray-800 p-1.5 rounded-full hover:bg-[#A91F64] transition duration-500" />
                    </a>
                </div>
            </div>

        </div>
    );
};

export default FooterPage;