import React from 'react';
import './SubscriptionCharts.scss';
import SubscriptionChart from '../SubscriptionChart/SubscriptionChart';
import CategoryWiseChart from '../CategoryWiseChart/CategoryWiseChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns, faList } from '@fortawesome/free-solid-svg-icons';

const SubscriptionCharts = ({ subscriptions }) => {
    const [twoColumnLayout, setTwoColumnLayout] = React.useState(true);

    const toggleLayout = () => {
        setTwoColumnLayout(!twoColumnLayout);
    };

    return (
        <div>
            <div className="subscription-charts__views">
                <div className="button-group">
                    <button onClick={() => setTwoColumnLayout(false)} className={!twoColumnLayout ? 'selected' : ''}>
                        <FontAwesomeIcon icon={faList} />
                    </button>
                    <button onClick={() => setTwoColumnLayout(true)} className={twoColumnLayout ? 'selected' : ''}>
                        <FontAwesomeIcon icon={faColumns} />
                    </button>
                </div>
            </div>
            
            <div className={`subscription-charts ${twoColumnLayout ? 'subscription-charts--two-column' : ''}`}>
                <div>
                    <h2>By Service</h2>
                    <SubscriptionChart key={twoColumnLayout ? 'two-column' : 'single-column'} subscriptions={subscriptions} />
                </div>
                <div>
                    <h2>By Category</h2>
                    <CategoryWiseChart key={twoColumnLayout ? 'two-column' : 'single-column'} subscriptions={subscriptions} />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCharts;