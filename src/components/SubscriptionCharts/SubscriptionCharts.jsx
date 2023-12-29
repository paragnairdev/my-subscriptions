import React from 'react';
import './SubscriptionCharts.scss';
import SubscriptionChart from '../SubscriptionChart/SubscriptionChart';
import CategoryWiseChart from '../CategoryWiseChart/CategoryWiseChart';

const SubscriptionCharts = ({ subscriptions }) => {
    const [twoColumnLayout, setTwoColumnLayout] = React.useState(true);

    const toggleLayout = () => {
        setTwoColumnLayout(!twoColumnLayout);
    };

    return (
        <div>
            <button onClick={toggleLayout}>
                {twoColumnLayout ? 'Switch to Single Column' : 'Switch to Two Columns'}
            </button>
            <div className={`subscription-charts ${twoColumnLayout ? 'subscription-charts--two-column' : ''}`}>
                <div>
                    <SubscriptionChart key={twoColumnLayout ? 'two-column' : 'single-column'} subscriptions={subscriptions} />
                </div>
                <div>
                    <CategoryWiseChart key={twoColumnLayout ? 'two-column' : 'single-column'} subscriptions={subscriptions} />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCharts;