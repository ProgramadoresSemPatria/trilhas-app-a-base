
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
        extend: {
            colors: {
                greenLogo: "#28d3a0",
                purpleLogo: "#4814b0",
                background: "#00060f",
                customPurple: "#18063a",
                customPurpleBtn: "#4F46E5",
            },
        },
    },
    plugins: [],
};