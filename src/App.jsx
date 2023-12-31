import React, { useState, useEffect } from 'react';
import './App.scss';
import SubscriptionForm from './components/SubscriptionForm/SubscriptionForm';
import SubscriptionList from './components/SubscriptionList/SubscriptionList';
import SubscriptionSummary from './components/SubscriptionSummary/SubscriptionSummary';
import SubscriptionCharts from './components/SubscriptionCharts/SubscriptionCharts';
import { addSubscription, hydrateSubscriptions, loadData, removeSubscription, resetData } from './services/dataService';
import { FaBarsStaggered, FaFileExport } from 'react-icons/fa6';
import { FaChartLine } from 'react-icons/fa';
import { MdFormatListBulleted, MdFormatListBulletedAdd } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import SubscriptionsLoader from './components/SubscriptionsLoader/SubscriptionsLoaded';
import GenericModal from './components/GenericModal/GenericModal';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

const App = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [showList, setShowList] = useState(true);
    const [showChart, setShowChart] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showSummary, setShowSummary] = useState(true);
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
            setShowList(false);
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
      setShowList(false);
      setShowChart(false);
      setShowForm(true);
    };

    const toggleListVisibility = () => {
      setShowList(!showList);
    };

    const toggleFormVisibility = () => {
      setShowForm(!showForm);
    };

    const toggleSummaryVisibility = () => {
      setShowSummary(!showSummary);
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

    return (
        <div className="App">
            <header className="App-header">
              <div className="App__logo-container">
                <img src="logo.png" alt="Subscription App Logo" className="app-logo" />
              </div>
              <div className="App__title">Subscription Tracker</div>
              
            </header>

            <main className='App-body'>

              <div className="App__actions">
                {!showForm && (
                  <button onClick={toggleFormVisibility}>
                    <MdFormatListBulletedAdd /> Add Subscription
                  </button>
                )}
                {/* <button onClick={toggleSummaryVisibility}>
                  <FaBarsStaggered /> {showSummary ? 'Hide' : 'Show'} Summary
                </button> */}
                <button onClick={toggleListVisibility}>
                  <MdFormatListBulleted /> {showList ? 'Hide' : 'Show'} Subscriptions
                </button>
                <button onClick={toggleChartVisibility}>
                  <FaChartLine /> {showChart ? 'Hide' : 'Show'} Charts
                </button>
                <div className="btn-export">
                  <button onClick={() => exportToJson(subscriptions)} 
                    data-tooltip-id="exportTip" 
                    data-tooltip-content="Download the subscriptions in a json format"
                    data-tooltip-place="bottom"><FaFileExport /> Export</button>
                  <Tooltip id="exportTip" />
                </div>
                <SubscriptionsLoader onSubscriptionsLoaded={onSubscriptionsLoaded} />
              </div>
              

              <hr />

              <GenericModal isOpen={showForm} onClose={onFormClosed} suffix="subscription-form">
                <SubscriptionForm addNewSubscription={addNewSubscription} onClose={onFormClosed}/>
              </GenericModal>

              <SubscriptionSummary subscriptions={subscriptions} />
              
              {showList && (
                  <SubscriptionList 
                      subscriptions={subscriptions} 
                      onDeleteSubscription={deleteSubscription} 
                      onClear={clearData}
                  />
              )}
              
              {showChart && (
                <div className='App__section'>
                  <SubscriptionCharts subscriptions={subscriptions} />
                </div>
              )}

              {/* <div className="App__row App__row--4-col">
                <ChartCard label="Monthly Total" subscriptions={subscriptions} type="monthly" />
                <ChartCard label="Yearly Total" subscriptions={subscriptions} type="yearly" />
              </div> */}
            </main>
            <footer className="App__footer">
              <button className="btn__link" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button>
            </footer>
            <GenericModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} suffix="privacy-policy">
              <PrivacyPolicy />
            </GenericModal>
        </div>
    );
};

export default App;
