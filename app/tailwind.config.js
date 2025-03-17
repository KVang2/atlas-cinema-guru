const plugin = require("@tailwindcss/forms");

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "Lblue": '#1ED2AF',
                "light-white": "#F9FAFE",
            },
            width: {
                "25": "6.25rem",
                "75": "18.75rem",
            }
        }
    },
    plugins: []
}