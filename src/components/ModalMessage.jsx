import React from "react";
import { useSpring, animated } from "react-spring";

const ModalTopUp = ({ show, onClose, children }) => {
    const animation = useSpring({
        transform: show ? "translateY(0%)" : "translateY(100%)",
        opacity: show ? 1 : 0,
    });

    return (
        <>
            {show && (
                <div className="fixed inset-0 z-30 flex items-center justify-center mx-auto w-72">
                    <animated.div
                        className="fixed inset-0 bg-black bg-opacity-20"
                        onClick={onClose}
                    ></animated.div>
                    <animated.div
                        style={animation}
                        className="bg-white p-6 rounded-md shadow-lg w-full relative"
                    >
                        {children}
                    </animated.div>
                </div>
            )}
        </>
    );
};

export default ModalTopUp;