import React, { useState, useEffect } from 'react';
import './App.scss';
import SubscriptionForm from './components/SubscriptionForm/SubscriptionForm';
import SubscriptionList from './components/SubscriptionList/SubscriptionList';
import SubscriptionSummary from './components/SubscriptionSummary/SubscriptionSummary';
import SubscriptionCharts from './components/SubscriptionCharts/SubscriptionCharts';
import { faLineChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addSubscription, loadData, removeSubscription, resetData } from './services/dataService';
import ChartCard from './components/ChartCard/ChartCard';

const App = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [showList, setShowList] = useState(true);
    const [showChart, setShowChart] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showSummary, setShowSummary] = useState(true);

    // Load subscriptions from localStorage when the component mounts
    useEffect(() => {
        const { subscriptions } = loadData();
        setSubscriptions(subscriptions);

        // if there are no subscriptions, show the form
        if (subscriptions.length === 0) {
            setShowForm(true);

            // hide the list and charts
            setShowList(false);
            setShowChart(false);
        }
    }, []);

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

    return (
        <div className="App">
            <header className="App-header">
              <img src="logo.png" alt="Subscription App Logo" className="app-logo" />
              <h1>Subscription Tracker</h1>
              <div>
                <button onClick={() => exportToJson(subscriptions)}>Export</button>
              </div>
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
                <SubscriptionForm addNewSubscription={addNewSubscription} />
              )}
              <button onClick={toggleListVisibility}>
                  {showList ? 'Hide' : 'Show'} Subscriptions
              </button>
              {showList && (
                  <SubscriptionList 
                      subscriptions={subscriptions} 
                      onDeleteSubscription={deleteSubscription} 
                      onClear={clearData}
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

              <div className="App__row App__row--4-col">
                <ChartCard label="Monthly Total" subscriptions={subscriptions} type="monthly" />
                <ChartCard label="Yearly Total" subscriptions={subscriptions} type="annually" />
              </div>
            </main>
        </div>
    );
};

export default App;
