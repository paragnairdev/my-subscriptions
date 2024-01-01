import React from 'react';
import './SubscriptionCharts.scss';
import SubscriptionChart from '../SubscriptionChart/SubscriptionChart';
import CategoryWiseChart from '../CategoryWiseChart/CategoryWiseChart';

const SubscriptionCharts = ({ subscriptions }) => {
    const [showMonthly, setShowMonthly] = React.useState(true);

    const hasSubscriptions = subscriptions && subscriptions.length > 0;

    if (!hasSubscriptions) {
        return <p>No subscriptions to draw charts.</p>;
    }

    return (
        <div>
            <div className="subscription-charts__views">
                <div className="button-group">
                    <button title="Monthly" onClick={() => setShowMonthly(true)} className={showMonthly ? 'subscription-charts__view--m selected' : 'subscription-charts__view--m'}>
                        M
                    </button>
                    <button title="Yearly" onClick={() => setShowMonthly(false)} className={!showMonthly ? 'subscription-charts__view--y selected' : 'subscription-charts__view--y'}>
                        Y
                    </button>
                </div>
            </div>
            
            <div className={`subscription-charts subscription-charts--two-column`}>
                <div>
                    <h2>{showMonthly ? 'Monthly' : 'Yearly'} Service</h2>
                    <SubscriptionChart key="service" subscriptions={subscriptions} calculatePerMonth={showMonthly} />
                </div>
                <div>
                    <h2>{showMonthly ? 'Monthly' : 'Yearly'} Category</h2>
                    <CategoryWiseChart key="category" subscriptions={subscriptions} calculatePerMonth={showMonthly} />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCharts;