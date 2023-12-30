const STORAGE_KEY = 'appData';
const defaultCategories = ["Entertainment", "Productivity", "Finance", "Education", "Health & Fitness"];

// Function to load data from localStorage
export const loadData = () => {
    const dataString = localStorage.getItem(STORAGE_KEY);
    let data = dataString ? JSON.parse(dataString) : { subscriptions: [], categories: [], currencySymbol: "£" };

    // Set default categories only if the categories array is empty
    if (data.categories.length === 0) {
        data.categories = defaultCategories;
    }

    return data;
};

// Function to save data to localStorage
export const saveData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addSubscription = (subscription) => {
    const data = loadData();
    data.subscriptions.push(subscription);
    saveData(data);
};

export const removeSubscription = (index) => {
    const data = loadData();
    data.subscriptions = data.subscriptions.filter((_, idx) => idx !== index);
    saveData(data);
};

export const hydrateSubscriptions = (subscriptions) => {
    const data = loadData();
    data.subscriptions = subscriptions;
    saveData(data);
};

export const addCategory = (category) => {
    const data = loadData();
    // sort categories alphabetically
    data.categories.push(category);
    data.categories.sort();
    saveData(data);
};

export const resetData = () => {
    const data = { subscriptions: [], categories: [], currencySymbol: "£" };
    saveData(data);
}

// Function to export data as JSON file
export const exportToJson = (data) => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "appData.json";
    link.click();
};
