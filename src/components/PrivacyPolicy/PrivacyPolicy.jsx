import React from "react";

const PrivacyPolicy = () => {
    const contactEmail = process.env.REACT_APP_CONTACT_EMAIL;
    return (
        <div>
            <h1>Privacy Policy</h1>
            <h2>Introduction</h2>
            <p>Our app, Subscription Tracker, is committed to protecting your privacy. This Privacy Policy explains how we handle user information.</p>
            <h2>Information Collection and Use</h2>
            <p>Subscription Tracker does not collect or transmit any personal data. All information, including subscription details, is stored locally on your device using localStorage. We do not use server-side APIs or external databases, ensuring all your data remains on your device.</p>
            <h2>No Data Sharing</h2>
            <p>We do not share, sell, rent, or trade user data with third parties.</p>
            <h2>Changes to This Policy</h2>
            <p>We may update our Privacy Policy occasionally. We encourage you to review this policy periodically.</p>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
        </div>
    );
};

export default PrivacyPolicy;