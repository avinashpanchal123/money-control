<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>💰 Money Control App</h1>
    <p>Money Control is a personal finance management tool that helps users track their income and expenses across various categories. It provides a detailed analysis of your spending habits, allowing you to make informed financial decisions. The app also visualizes expense data using interactive charts.</p>
    <h2>🌐 Deployed Link</h2>
    <p>You can check out the live app <a href="https://money-control-kohl.vercel.app/" target="_blank" rel="noopener noreferrer">here</a>.</p>
    <h2>🛠️ Key Features</h2>
    <ul>
        <li><strong>Income & Expense Tracking:</strong> Keep track of all your income and expenses, categorized for better clarity.</li>
        <li><strong>Expense Analysis:</strong> Get insights into your spending habits through detailed charts, including pie charts and bar graphs for category-based breakdowns.</li>
        <li><strong>Category Management:</strong> Easily manage categories like Food, Health, Salary, and more.</li>
        <li><strong>File Upload:</strong> Upload transaction files and automatically update your transaction database.</li>
        <li><strong>Authentication:</strong> Securely manage your session using JWT-based authentication.</li>
        <li><strong>Responsive Design:</strong> Fully responsive and mobile-friendly UI.</li>
    </ul>
    <h2>🚀 Tech Stack</h2>
    <ul>
        <li><strong>Frontend:</strong> React, Tailwind CSS</li>
        <li><strong>Backend:</strong> Node.js, Express.js</li>
        <li><strong>Database:</strong> MySQL</li>
        <li><strong>Visualization:</strong> ApexCharts</li>
        <li><strong>State Management:</strong> Redux</li>
        <li><strong>Version Control:</strong> Git, GitHub</li>
    </ul>
    <h2>⚙️ Installation & Setup</h2>
    <p>Follow the instructions below to set up the project on your local machine:</p>
    <h3>1. Clone the repository</h3>
    <pre><code>git clone https://github.com/avinashpanchal123/money-control.git
cd money-control</code></pre>
    <h3>2. Install dependencies</h3>
    <h4>Backend</h4>
    <pre><code>cd backend
npm install</code></pre>
    <h4>Frontend</h4>
    <pre><code>cd frontend
npm install</code></pre>
    <h3>3. Set up MySQL Database</h3>
    <p>Create a MySQL database and configure the connection details in <code>backend/config/db.js</code>:</p>
    <pre><code>module.exports = {
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'money_control'
};</code></pre>
    <h3>4. Configure Environment Variables</h3>
    <p>Create a <code>.env</code> file in the <code>backend</code> folder to define your environment variables:</p>
    <pre><code># .env file
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=money_control</code></pre>
    <h3>5. Run the Application</h3>
    <h4>Backend</h4>
    <pre><code>npm start</code></pre>
    <h4>Frontend</h4>
    <pre><code>npm start</code></pre>
    <h3>6. Access the App</h3>
    <p>Visit <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser to start using the Money Control app.</p>
    <h2>📊 Features Overview</h2>
    <h3>1. Analysis </h3>
    <ul>
        <li>Overview of income and expenses for the current month.</li>
        <li>Displays charts (pie and bar charts) representing category-wise expense analysis.</li>
    </ul>
    <h3>2. Add Transaction</h3>
    <ul>
        <li>Add new transactions by specifying the amount, category, and description.</li>
        <li>Choose between income and expense.</li>
    </ul>
    <h3>3. Expense Analysis</h3>
    <ul>
        <li>View a detailed breakdown of your spending by category.</li>
        <li>Interactive donut chart with category labels and total spent values.</li>
    </ul>
    <h3>4. File Upload</h3>
    <p>Upload bank transaction files in CSV format to update your transactions.</p>
</body>
</html>
