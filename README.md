# Onebox Email Aggregator

Onebox Email Aggregator is a Node.js and TypeScript-based application that aggregates emails from different email accounts using IMAP, synchronizes them in real-time, provides search functionality using Elasticsearch, and supports AI-based email categorization. Notifications are sent using Slack webhooks.

## Features
- *Email Aggregation:* Fetches emails using IMAP protocol.
- *Real-Time Synchronization:* Keeps emails updated.
- *AI-Powered Categorization:* Uses OpenAI for intelligent email classification.
- *Search Functionality:* Powered by Elasticsearch for fast searches.
- *Notifications:* Sends notifications using Slack webhooks.

---

## Project Structure

ONEBOX_EMAIL_AGGREGATOR
│
├── frontend
│   ├── node_modules
│   ├── public
│   ├── src
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── tsconfig.json
│
├── src
│   ├── aiReplyService.ts
│   ├── elasticSearchService.ts
│   ├── emailCategorization.ts
│   ├── imapService.ts
│   ├── index.ts
│   ├── notificationService.ts
│   └── .env
│
├── node_modules
├── package.json
├── package-lock.json
└── .env


---

## Prerequisites
Make sure you have the following installed:
- Node.js (v18+)
- npm or yarn
- Elasticsearch (running on port 9200)

---

## Environment Variables
Create a .env file in the root directory and configure the following:
env
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=raginigupta523@gmail.com
IMAP_PASS=jlzs cgfi kcqq mnlg
ELASTICSEARCH_HOST=http://localhost:9200
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your-webhook-url

OPENAI_API_KEY=your_actual_api_key_here
PORT=5000


---

## Installation
1. Clone the repository:
bash
git clone https://github.com/your-username/onebox-email-aggregator.git
cd onebox-email-aggregator


2. Install dependencies for both backend and frontend:
bash
npm install
cd frontend
npm install


---

## Usage
1. Start Elasticsearch (Ensure it is running on http://localhost:9200).
2. Start the Backend:
bash
npm run start

3. Start the Frontend:
bash
cd frontend
npm start

4. Visit the app at [http://localhost:3000/emails](http://localhost:3000/emails).

---

## API Endpoints
- POST /emails/sync: Sync emails from the server.
- GET /emails: Retrieve a list of emails.
- GET /emails/search?query=keyword: Perform a search query.
- POST /emails/categorize: Perform AI-based categorization.

---

## Contributing
1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m 'Add feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For any inquiries, please contact your-raginigupta523@gmail.com.


For Better Understanding refer this video: https://drive.google.com/drive/folders/1peI2hBagGwiyRyzLECsLnK59midMg8qS?usp=sharing
