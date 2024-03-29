const STORAGE_KEY = 'appData';
const GA_CONSENT_KEY = 'gaConsent';
const defaultCategories = ["Education", "Entertainment", "Finance", "Health & Fitness", "Productivity", "Shopping", "Social", "Utilities", "Other"];
export const COLORS = [
    "#a8cc01",
    "#2bf8b8",
    "#2efc0f",
    "#821ac2",
    "#2982d7",
    "#25c144",
    "#7514c9",
    "#d8f805",
    "#d81369",
    "#8fbf20"
];

export const CATEGORY_COLORS = [
    "#ff0000",
    "#FF9B19",
    "#ffd300",
    "#deff0a",
    '#78C351',
    "#0aff99",
    "#0aefff",
    "#147df5",
    "#580aff",
    "#be0aff"
];

export const CATEGORY_COLORS_DARK = [
    "#ff0000",
    "#ff8700",
    "#ffd300",
    "#deff0a",
    "#a1ff0a",
    "#0aff99",
    "#0aefff",
    "#147df5",
    "#580aff",
    "#be0aff"
];

// mapping of category to color
export const CATEGORY_COLOR_MAP = defaultCategories.reduce((acc, category, index) => {
    acc[category] = {
        light: CATEGORY_COLORS[index],
        dark: CATEGORY_COLORS_DARK[index]
    };
    return acc;
}, {});

// rupee symbol
export const RUPEE = `₹`;
export const DOLLAR = `$`;
export const EURO = `€`;
export const POUND = `£`;

export const CURRENCIES = [POUND, DOLLAR, RUPEE, EURO];

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

// Function to load the currency symbol from localStorage
export const loadCurrencySymbol = () => {
    const data = loadData();
    return data.currencySymbol;
};

export const addSubscription = (subscription) => {
    const data = loadData();
    data.subscriptions.push(subscription);
    saveData(data);
};

export const deleteSubscriptionFromDB = (subscription) => {
    const { name, amount } = subscription;
    const data = loadData();
    data.subscriptions = data.subscriptions.filter((subscription) => subscription.name !== name && subscription.amount !== amount);
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

export const updateCurrencySymbol = (currencySymbol) => {
    const data = loadData();
    data.currencySymbol = currencySymbol;
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

export const getCategoryColor = (category) => {
    // get current theme
    const currentTheme = getUserTheme();

    // if the category is not in the map, return a random color
    if (!CATEGORY_COLOR_MAP[category]) {
        const randomIndex = Math.floor(Math.random() * CATEGORY_COLORS.length);
        return currentTheme === 'light' ? CATEGORY_COLORS[randomIndex] : CATEGORY_COLORS_DARK[randomIndex];
    }
    const color = CATEGORY_COLOR_MAP[category][currentTheme];
    return color;
};

export const getGaConsent = () => {
    const gaConsent = localStorage.getItem(GA_CONSENT_KEY);
    return gaConsent === 'true';
};

export const setGaConsent = (consent) => {
    localStorage.setItem(GA_CONSENT_KEY, consent);
};

export const isGaConsentSet = () => {
    return localStorage.getItem(GA_CONSENT_KEY) !== null;
};

export const getUserTheme = () => {
    let currentTheme = localStorage.getItem('theme');
    // if no theme set, set current theme to dark
    if (!currentTheme) {
        currentTheme = 'light';
        setUserTheme(currentTheme);
    }
    return currentTheme;
};

export const setUserTheme = (theme) => {
    localStorage.setItem('theme', theme);
};

export const SUBSCRIPTION_TYPES = {
    YEARLY: 'yearly',
    MONTHLY: 'monthly'
};

export const SUBSCRIPTION_TYPES_LABELS = {
    YEARLY: 'Yearly',
    MONTHLY: 'Monthly'
};

export const getChartLabelColor = () => {
    const currentTheme = getUserTheme();
    return currentTheme === 'light' ? '#000' : '#fff';
};