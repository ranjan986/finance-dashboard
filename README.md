# Finance Dashboard UI

A visually impressive, dark-themed Finance Dashboard built to demonstrate modern React frontend fundamentals, scalable state management via Context API, and intuitive UX/UI patterns. 

---

## 🛠 Setup Instructions

This project was bootstrapped with Vite under Node.js. 

To run the project locally, please ensure you have Node installed, then execute the following commands in your terminal:

\`\`\`bash
# 1. Clone or navigate to the project directory
cd "Finanace Dashboard/frontend"

# 2. Install required dependencies
# Note: Use --legacy-peer-deps to handle React 19 dependencies cleanly
npm install --legacy-peer-deps

# 3. Run the development server
npm run dev
\`\`\`

The application should now be running on \`http://localhost:5173\`.

---

## 🏗 Overview of Approach

My development approach was strictly centered around **Modularity, Reusability, and Context-Driven Data**.

1. **Framework:** React 19 via Vite for high-speed module reloading and modern hook support.
2. **Component Architecture:** The UI is split intelligently. A base \`Layout\` component houses the navigation (Sidebar + Topbar), passing rendering duties to internal route components (\`Dashboard\`, \`Transactions\`, \`Insights\`). These views are further broken down into highly reusable modular pieces like \`SummaryCard\` and the \`TransactionForm\` modal.
3. **State Management:** Instead of prop-drilling, the \`FinanceContext\` serves as the unified source of truth. It exposes standard getters (\`transactions\`, \`role\`, \`stats\`) and setters (\`addTransaction\`, \`deleteTransaction\`, \`toggleRole\`). This decouples UI logic from state logic, ensuring components only subscribe to the data they need.
4. **Data Persistence:** Integrated \`localStorage\` within the Context Provider so that the mock transaction state instantly saves and re-hydrates across page reloads.
5. **Styling Strategy:** Tailwind CSS v4 is used extensively. Instead of hardcoding hex colors, I configured robust global CSS variables inside \`index.css\` (\`--primary\`, \`--background\`, etc.) ensuring deep dynamic consistency across all complex UI modules (glassmorphism/blur effects).

---

## ✨ Explanation of Features

### 1. Dashboard Overview
Provides immediate visibility into your global financial health. 
* Contains live **Total Balance**, **Income**, and **Expenses** summary cards.
* Integrates \`Recharts\` to render a reactive **Balance Trend** time-based area chart.
* Calculates and displays a proportional **Top Expenses API** categorical interactive pie chart.

### 2. Transactions Component
A fully functional, flexible data grid for handling mock financial records.
* Supports **Text Searching** (by description/category).
* Displays formatted columns for Date, Amount, Category, and computed Types.
* Supports rapid **Type Filtering** (All, Income, Expense).

### 3. Role-Based Access Control (RBAC)
Demonstrates frontend-only role simulation via the Topbar toggle button.
* **Viewer Role**: Read-only restrictions. Hides the "New Transaction" action capabilities and completely removes the "Trash" row deletion buttons from the DOM.
* **Admin Role**: Gains access to the modal injection to append completely new records, and regains full CRUD modifying capabilities to alter existing transaction datasets.

### 4. Automated Insights
The "Insights" tab dynamically processes your dataset array via \`useMemo\` and calculates complex metrics without hardcoding:
* Your **Highest Spending Category**.
* Your current relative **Savings Rate**.
* Isolates your single **Largest Expense**.

### ⭐ Optional Enhancements Included
To elevate the quality of this codebase, the following optional parameters were fully implemented:
* **Dark Mode Aesthetics:** A bespoke dark environment prioritizing contrast and legibility.
* **Data Persistence:** Bound Context state to browser \`localStorage\`.
* **Export CSV:** Automatically generates and downloads structured tabular reports natively from the client memory context.
* **Complex UI Enhancements:** Tailwind-powered micro-animations, transitions, and slide-in render lifecycles.
