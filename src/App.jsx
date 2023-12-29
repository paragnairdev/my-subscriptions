import React, { useState, useEffect } from 'react';
import './App.scss';
import SubscriptionForm from './components/SubscriptionForm/SubscriptionForm';
import SubscriptionList from './components/SubscriptionList/SubscriptionList';
import SubscriptionSummary from './components/SubscriptionSummary/SubscriptionSummary';
import SubscriptionCharts from './components/SubscriptionCharts/SubscriptionCharts';
import { faLineChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [showList, setShowList] = useState(true);
    const [showChart, setShowChart] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showSummary, setShowSummary] = useState(true);

    // Load subscriptions from localStorage when the component mounts
    useEffect(() => {
        const savedSubscriptions = getSubscriptionsFromLocalStorage();
        if (savedSubscriptions) {
            setSubscriptions(savedSubscriptions);
        }
    }, []);

    // Save data to localStorage
    const saveSubscriptionsToLocalStorage = (data) => {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem('subscriptions', serializedData);
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    };

    // Retrieve data from localStorage
    const getSubscriptionsFromLocalStorage = () => {
        try {
            const serializedData = localStorage.getItem('subscriptions');
            return serializedData ? JSON.parse(serializedData) : [];
        } catch (error) {
            console.error('Failed to retrieve from localStorage:', error);
            return [];
        }
    };

    // Handler to update subscriptions both in state and localStorage
    const updateSubscriptions = (newSubscription) => {
        const updatedSubscriptions = [...subscriptions, newSubscription];
        setSubscriptions(updatedSubscriptions);
        saveSubscriptionsToLocalStorage(updatedSubscriptions);
    };

    const deleteSubscription = (index) => {
      const updatedSubscriptions = subscriptions.filter((_, idx) => idx !== index);
      setSubscriptions(updatedSubscriptions);
      saveSubscriptionsToLocalStorage(updatedSubscriptions);
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

    return (
        <div className="App">
            <header className="App-header">
              <img src="logo.png" alt="Subscription App Logo" className="app-logo" />
              <h1>Subscription Tracker</h1>
              <div></div>
            </header>

            <main className='App-body'>
              <button onClick={toggleSummaryVisibility}>
                  {showSummary ? 'Hide' : 'Show'} Summary
              </button>
              {showSummary && (
                <SubscriptionSummary subscriptions={subscriptions} />
              )}
              <button onClick={toggleFormVisibility}>
                  {showForm ? 'Hide Form' : 'Add Subscriptions'}
              </button>
              {showForm && (
                <SubscriptionForm updateSubscriptions={updateSubscriptions} />
              )}
              <button onClick={toggleListVisibility}>
                  {showList ? 'Hide' : 'Show'} Subscriptions
              </button>
              {showList && (
                  <SubscriptionList 
                      subscriptions={subscriptions} 
                      onDeleteSubscription={deleteSubscription} 
                  />
              )}
              <button onClick={toggleChartVisibility}>
                  {showChart ? 'Hide' : 'Show'} <FontAwesomeIcon icon={faLineChart} />
              </button>
              {showChart && (
                <div className='App__section'>
                  <SubscriptionCharts subscriptions={subscriptions} />
                </div>
              )}
            </main>
        </div>
    );
};

export default App;
