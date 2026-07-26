import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ fallback = '/', className = '', children }) => {
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        // If there is history to go back to, go back. Otherwise navigate to fallback.
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallback);
        }
    };

    return (
        <button onClick={handleBack} className={className} type="button">
            <ArrowLeft size={16} />
            {children || 'Back'}
        </button>
    );
};

export default BackButton;
