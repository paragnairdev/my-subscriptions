import React, { useState, useEffect } from 'react';
import './App.scss';
import SubscriptionForm from './components/SubscriptionForm/SubscriptionForm';
import SubscriptionList from './components/SubscriptionList/SubscriptionList';
import SubscriptionSummary from './components/SubscriptionSummary/SubscriptionSummary';
import SubscriptionCharts from './components/SubscriptionCharts/SubscriptionCharts';
import { addSubscription, hydrateSubscriptions, loadData, removeSubscription, resetData } from './services/dataService';
import { FaFileExport } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';
import SubscriptionsLoader from './components/SubscriptionsLoader/SubscriptionsLoaded';
import GenericModal from './components/GenericModal/GenericModal';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Switch from './components/Switch/Switch';

const App = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [showList, setShowList] = useState(true);
    const [showChart, setShowChart] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [currency, setCurrency] = useState('£');
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    // Load subscriptions from localStorage when the component mounts
    useEffect(() => {
        const { subscriptions, currencySymbol } = loadData();
        setSubscriptions(subscriptions);
        setCurrency(currencySymbol);

        // if there are no subscriptions, show the form
        if (subscriptions.length === 0) {
            // hide the list and charts
            setShowChart(false);
        }
    }, [showForm]);

    const addNewSubscription = (newSubscription) => {
      addSubscription(newSubscription);
      setSubscriptions(loadData().subscriptions);

      // if there is only one subscription, show the list and charts
      if (subscriptions.length === 0) {
          setShowList(true);
          setShowChart(true);
      }
    };

    const deleteSubscription = (index) => {
      removeSubscription(index);
      setSubscriptions(loadData().subscriptions);
    };

    const clearData = () => {
      resetData();
      setSubscriptions([]);
      setShowChart(false);
    };

    const toggleListVisibility = () => {
      setShowList(!showList);
    };

    const toggleFormVisibility = () => {
      setShowForm(!showForm);
    };
    
    const toggleChartVisibility = () => {
      setShowChart(!showChart);
    };

    const exportToJson = (data) => {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(data)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "subscriptions.json";
      link.click();
    };

    const onFormClosed = () => {
      setShowForm(false);
    };

    const onSubscriptionsLoaded = (subscriptions) => {
      hydrateSubscriptions(subscriptions);
      setSubscriptions(subscriptions);
      setShowForm(false);
      setShowList(true);
      setShowChart(true);
    };

    const handleSubscriptionToggle = () => {
      setShowList(!showList);
    };

    const handleChartsToggle = () => {
      setShowChart(!showChart);
    };

    return (
        <div className="App">
            <header className="App-header">
              <div className="App__logo-container">
                <img src="logo.png" alt="Subscription App Logo" className="app-logo" />
              </div>
              <div className="App__title">Subscription Tracker</div>
              
            </header>

            <main className='App-body'>

              <div className="App__toolbar">
                <div className="App__switches App__switches--align-right">
                  <Switch label={`Subscriptions`} isOn={showList} handleToggle={handleSubscriptionToggle} />
                  <Switch label={`Charts`} isOn={showChart} handleToggle={handleChartsToggle}/>
                </div>
                <div className="App__actions hide--sm">
                  <div className="btn-export">
                    <button onClick={() => exportToJson(subscriptions)} 
                      data-tooltip-id="exportTip" 
                      data-tooltip-content="Download the subscriptions in a json format"
                      data-tooltip-place="bottom"><FaFileExport /> Export</button>
                    <Tooltip id="exportTip" />
                  </div>
                  <SubscriptionsLoader onSubscriptionsLoaded={onSubscriptionsLoaded} />
                </div>
              </div>

              <GenericModal isOpen={showForm} onClose={onFormClosed} suffix="subscription-form" heading="Add a subscription">
                <SubscriptionForm addNewSubscription={addNewSubscription} onClose={onFormClosed}/>
              </GenericModal>

              <SubscriptionSummary subscriptions={subscriptions} />
              
              {showList && (
                <div className='App__section'>
                  <SubscriptionList 
                      subscriptions={subscriptions} 
                      onDeleteSubscription={deleteSubscription} 
                      onClear={clearData}
                      onAddSubscription={toggleFormVisibility}
                  />
                </div>
              )}
              
              {showChart && (
                <div className='App__section'>
                  <SubscriptionCharts subscriptions={subscriptions} />
                </div>
              )}
            </main>
            <footer className="App__footer">
              <div className="App__footer-logo">
                <img src="logo.png" alt="Subscription App Logo" className="app-logo" />
                &copy; 2024 Subscription Tracker
              </div>
              <button className="btn__link" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button>
            </footer>
            <GenericModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} suffix="privacy-policy">
              <PrivacyPolicy />
            </GenericModal>
        </div>
    );
};

export default App;
