# ⚡ SPARK - Student Portal for Academic Records & Knowledge

<div align="center">

![SPARK Logo](https://img.shields.io/badge/SPARK-Student%20Portal-667eea?style=for-the-badge&logo=graduation-cap&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, feature-rich student portal with AI-powered assistance**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API Reference](#api-reference) • [Contributing](#contributing)

</div>

---

## 🌟 Features

### Core Functionality
- 📊 **Dashboard** - Real-time overview of CGPA, attendance, and courses
- 📅 **Attendance Tracking** - Course-wise attendance with visual progress indicators
- 📚 **Course Management** - View enrolled courses, syllabi, and materials
- 📈 **Academic Results** - Semester-wise grade display with performance analytics
- 📉 **Performance Analysis** - SGPA trends, charts, and performance metrics
- 👤 **Profile Management** - View and update personal information

### AI-Powered Features
- 🤖 **SPARK AI Chatbot** - Intelligent assistant for academic queries
  - Context-aware responses based on student data
  - Quick action buttons for common queries
  - Real-time typing indicators and smooth animations

### Modern UI/UX
- 🌓 **Dark/Light Theme** - System-aware theme with manual toggle
- 🔔 **Toast Notifications** - Non-intrusive feedback system
- ✨ **Glassmorphism Design** - Modern, premium visual aesthetics
- 📱 **Responsive Layout** - Works on all device sizes
- 🎨 **Smooth Animations** - Micro-interactions for better UX

### Additional Features
- 📝 **Feedback System** - Submit suggestions, complaints, or appreciation
- 🗓️ **Quick Access** - Timetable, exams, events, and messages
- 🔐 **Secure Authentication** - Session-based login system

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **AI** | OpenAI GPT API (optional), Built-in NLP |
| **Charts** | Chart.js |
| **Icons** | Font Awesome 6 |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/spark-student-portal.git
cd spark-student-portal
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
Create a `.env` file in the root directory:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=student_portal

# OpenAI API (Optional - leave empty to use built-in responses)
OPENAI_API_KEY=

# Server Configuration
PORT=2006
NODE_ENV=development
```

### Step 4: Setup Database
```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE student_portal;"

# Import the schema
mysql -u root -p student_portal < database/schema.sql
mysql -u root -p student_portal < database/setup.sql
```

### Step 5: Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:2006`

---

## 🚀 Usage

### Default Login
For demo purposes, you can use:
- **Username**: `STU001`
- **Password**: `password123`

### Navigation
1. **Home** - Dashboard with quick stats and access cards
2. **Attendance** - View course-wise attendance percentage
3. **Courses** - Browse enrolled courses and materials
4. **Results** - View semester-wise academic results
5. **Analysis** - Performance trends and metrics
6. **Feedback** - Submit feedback to administration
7. **Profile** - View and edit personal information

### AI Chatbot
Click the robot icon (🤖) in the bottom-right corner to:
- Ask about attendance status
- Check grades and CGPA
- Get exam schedules
- Request study tips
- And more!

---

## 📁 Project Structure

```
spark-student-portal/
├── backend/
│   ├── server.js          # Main server file
│   ├── chatbot-api.js     # AI chatbot logic
│   └── ...
├── frontend/
│   ├── index.html         # Main dashboard
│   ├── login.html         # Login page
│   ├── style.css          # Main styles
│   ├── chatbot.css        # Chatbot styles
│   ├── chatbot.js         # Chatbot functionality
│   ├── script.js          # Main app logic
│   ├── css/               # Additional styles
│   └── js/                # Additional scripts
├── database/
│   ├── schema.sql         # Database schema
│   └── setup.sql          # Initial data
├── data/                  # CSV data files
├── .env.example           # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🔌 API Reference

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/login` | POST | Authenticate user |

### Student Data
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/student/:id` | GET | Get student profile |
| `/api/student/:id/attendance` | GET | Get attendance data |
| `/api/student/:id/courses` | GET | Get enrolled courses |
| `/api/student/:id/results` | GET | Get academic results |
| `/api/student/:id/semester-records` | GET | Get semester-wise records |

### Chatbot
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send message to AI |
| `/api/chat/history/:sessionId` | GET | Get chat history |

### Feedback
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/feedback` | POST | Submit feedback |

---

## 🎨 Customization

### Theme Colors
Edit the CSS custom properties in `frontend/style.css`:
```css
:root {
    --primary-500: #6366f1;  /* Main brand color */
    --accent-purple: #8b5cf6;
    --accent-pink: #ec4899;
    /* ... more colors */
}
```

### Adding New Features
1. Create new section in `index.html`
2. Add navigation item in sidebar
3. Implement functionality in `script.js`
4. Add API endpoint in `server.js`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Chart.js](https://www.chartjs.org/) for charts
- [Google Fonts](https://fonts.google.com/) for typography
- [OpenAI](https://openai.com/) for AI capabilities

---

<div align="center">

**Made with ❤️ for students everywhere**

⭐ Star this repo if you find it helpful!

</div>
