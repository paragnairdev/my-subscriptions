import React from 'react';
import { FaFileImport } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';

const SubscriptionsLoader = ({ onSubscriptionsLoaded }) => {
    const fileInputRef = React.useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const subscriptions = JSON.parse(e.target.result);
                onSubscriptionsLoaded(subscriptions);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };

        reader.readAsText(file);
    };

    return (
        <div className="btn-import">
            <input 
                type="file" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                ref={fileInputRef}
            />
            <button onClick={() => fileInputRef.current.click()}
                data-tooltip-id="importTip" 
                data-tooltip-content="Upload the json format subscriptions you downloaded"
                data-tooltip-place="bottom">
                <FaFileImport /> Import
            </button>
            <Tooltip id="importTip" />
        </div>
    );
};

export default SubscriptionsLoader;
