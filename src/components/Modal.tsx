// Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
