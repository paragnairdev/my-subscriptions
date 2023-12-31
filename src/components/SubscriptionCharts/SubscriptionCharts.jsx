import React from 'react';
import './SubscriptionCharts.scss';
import SubscriptionChart from '../SubscriptionChart/SubscriptionChart';
import CategoryWiseChart from '../CategoryWiseChart/CategoryWiseChart';
import SubscriptionStackedChart from '../SubscriptionStackedChart/SubscriptionStackedChart';

const SubscriptionCharts = ({ subscriptions }) => {
    const [twoColumnLayout, setTwoColumnLayout] = React.useState(true);
    const [showMonthly, setShowMonthly] = React.useState(true);

    const hasSubscriptions = subscriptions && subscriptions.length > 0;

    if (!hasSubscriptions) {
        return <p>No subscriptions to draw charts.</p>;
    }

    return (
        <div>
            <div className="subscription-charts__views">
                <div className="button-group">
                    <button title="Monthly" onClick={() => setShowMonthly(true)} className={showMonthly ? 'selected' : ''}>
                        M
                    </button>
                    <button title="Yearly" onClick={() => setShowMonthly(false)} className={!showMonthly ? 'selected' : ''}>
                        Y
                    </button>
                </div>
            </div>
            
            <div className={`subscription-charts subscription-charts--two-column`}>
                <div>
                    <h2>{showMonthly ? 'Monthly' : 'Yearly'} Service</h2>
                    <SubscriptionChart key={twoColumnLayout ? 'two-column' : 'single-column'} subscriptions={subscriptions} calculatePerMonth={showMonthly} />
                </div>
                <div>
                    <h2>{showMonthly ? 'Monthly' : 'Yearly'} Category</h2>
                    <CategoryWiseChart key={twoColumnLayout ? 'two-column' : 'single-column'} subscriptions={subscriptions} calculatePerMonth={showMonthly} />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCharts;