// ═══════════════════════════════════════════════════════════════════════════
//  SPARK AI Chatbot - Intelligent Academic Assistant
//  Modern, context-aware chatbot with smart responses
// ═══════════════════════════════════════════════════════════════════════════

class SPARKChatbot {
    constructor() {
        this.chatHistory = [];
        this.isTyping = false;
        this.studentContext = null;

        // DOM Elements
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.closeBtn = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.quickActions = document.querySelectorAll('.quick-action-btn');

        this.init();
    }

    init() {
        if (!this.toggle || !this.window) return;

        // Event listeners
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());

        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick action buttons
        this.quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                if (query) {
                    this.input.value = query;
                    this.sendMessage();
                }
            });
        });

        // Load student context
        this.loadStudentContext();
    }

    toggleChat() {
        if (this.window.classList.contains('open')) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.window.classList.add('open');
        this.toggle.innerHTML = '<i class="fas fa-times"></i>';
        this.input.focus();

        // Load context when chat opens
        this.loadStudentContext();
    }

    closeChat() {
        this.window.classList.remove('open');
        this.toggle.innerHTML = '<i class="fas fa-robot"></i>';
    }

    async loadStudentContext() {
        // Try to get student data from the page
        const cgpa = document.querySelector('.cgpa-value')?.textContent || '0.00';
        const attendance = document.querySelector('.attendance-value')?.textContent || '0%';
        const name = document.querySelector('.student-name')?.textContent || 'Student';
        const department = document.querySelector('.student-department')?.textContent || '';
        const semester = document.querySelector('.student-semester')?.textContent || '';

        this.studentContext = {
            name,
            cgpa,
            attendance,
            department,
            semester
        };
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (message === '' || this.isTyping) return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatHistory.push({ role: 'user', content: message });

        // Clear input
        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Get AI response
        this.getAIResponse(message);
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const avatar = sender === 'bot' ? '🤖' : '👤';
        const time = this.getCurrentTime();

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-bubble">${this.formatMessage(content)}</div>
                <span class="message-time">${time}</span>
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(content) {
        // Convert markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    showTypingIndicator() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async getAIResponse(message) {
        try {
            // Simulate API delay
            const delay = 1000 + Math.random() * 1500;
            await new Promise(resolve => setTimeout(resolve, delay));

            // Generate intelligent response
            const response = this.generateSmartResponse(message);

            // Remove typing indicator and add response
            this.removeTypingIndicator();
            this.addMessage(response, 'bot');
            this.chatHistory.push({ role: 'assistant', content: response });

        } catch (error) {
            console.error('Error getting AI response:', error);
            this.removeTypingIndicator();
            this.addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
        }
    }

    generateSmartResponse(message) {
        const lowerMessage = message.toLowerCase();
        const ctx = this.studentContext || {};

        // Greeting patterns
        if (this.matchesPatterns(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            const greetings = [
                `Hello${ctx.name ? ', ' + ctx.name.split(' ')[0] : ''}! 👋 How can I help you with your academics today?`,
                `Hi there! I'm here to help with attendance, grades, courses, and more. What would you like to know?`,
                `Welcome back! Ready to assist you with any academic queries. What's on your mind?`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }

        // Attendance queries
        if (this.matchesPatterns(lowerMessage, ['attendance', 'present', 'absent', 'classes attended'])) {
            const attendanceValue = ctx.attendance || '87%';
            const numValue = parseFloat(attendanceValue);
            let status = '';

            if (numValue >= 85) {
                status = "Excellent! You're maintaining great attendance. 🎉";
            } else if (numValue >= 75) {
                status = "Good standing, but try to attend more classes to stay safe. 📚";
            } else {
                status = "⚠️ Your attendance is low. Please attend more classes to avoid attendance shortage.";
            }

            return `📊 **Your Attendance Overview**\n\nYour current overall attendance is **${attendanceValue}**.\n\n${status}\n\n*Tip: Regular attendance is key to academic success!*`;
        }

        // Grades/CGPA queries
        if (this.matchesPatterns(lowerMessage, ['cgpa', 'gpa', 'grades', 'score', 'marks', 'result'])) {
            const cgpa = ctx.cgpa || '8.5';
            const numCgpa = parseFloat(cgpa);
            let performance = '';

            if (numCgpa >= 9.0) {
                performance = "Outstanding performance! Keep up the excellent work! 🌟";
            } else if (numCgpa >= 8.0) {
                performance = "Great job! You're performing very well. 📈";
            } else if (numCgpa >= 7.0) {
                performance = "Good performance! There's room for improvement. 💪";
            } else {
                performance = "Consider focusing more on your studies. I'm here to help! 📖";
            }

            return `📚 **Academic Performance**\n\nYour current CGPA is **${cgpa}**\n\n${performance}\n\n*Would you like tips on improving your grades?*`;
        }

        // Exam queries
        if (this.matchesPatterns(lowerMessage, ['exam', 'test', 'midterm', 'final', 'quiz'])) {
            return `📝 **Exam Information**\n\nHere's what you need to know:\n\n• Check the **Exams** section in Quick Access for upcoming exams\n• Exam schedules are updated regularly\n• Don't forget to review your course syllabus\n\n*Tip: Start preparing at least a week before each exam!*`;
        }

        // Course queries
        if (this.matchesPatterns(lowerMessage, ['course', 'subject', 'class', 'credit', 'registration'])) {
            const semester = ctx.semester || '4';
            return `📖 **Course Information**\n\nYou're currently in semester **${semester}**.\n\nTo view your registered courses:\n1. Navigate to the **Courses** section\n2. Click on any course for detailed information\n3. Access syllabus, materials, and assignments\n\n*Need help with a specific course? Just ask!*`;
        }

        // Timetable queries
        if (this.matchesPatterns(lowerMessage, ['timetable', 'schedule', 'class timing', 'when is'])) {
            return `🗓️ **Your Schedule**\n\nYou can access your complete timetable by:\n1. Clicking on **Timetable** in Quick Access\n2. Or navigating to the Courses section\n\n*Classes are color-coded by subject for easy identification!*`;
        }

        // Help queries
        if (this.matchesPatterns(lowerMessage, ['help', 'what can you do', 'assist', 'support'])) {
            return `🤖 **How I Can Help**\n\nI'm SPARK AI, your academic assistant! Here's what I can do:\n\n• 📊 Check your **attendance** status\n• 📚 View your **CGPA** and grades\n• 📝 Get **exam** schedules\n• 📖 **Course** information\n• 🗓️ Access your **timetable**\n• 💡 Provide **study tips**\n\n*Just ask me anything about your academics!*`;
        }

        // Study tips
        if (this.matchesPatterns(lowerMessage, ['study', 'tips', 'improve', 'better grades', 'focus'])) {
            return `💡 **Study Tips for Success**\n\n1. **Plan Your Time**: Create a weekly study schedule\n2. **Active Learning**: Don't just read - take notes and practice\n3. **Regular Breaks**: Use the Pomodoro technique (25 min study, 5 min break)\n4. **Stay Organized**: Keep track of assignments and deadlines\n5. **Ask Questions**: Don't hesitate to clarify doubts\n\n*Consistency beats intensity. Study a little every day!*`;
        }

        // Profile queries
        if (this.matchesPatterns(lowerMessage, ['profile', 'my info', 'my details', 'about me'])) {
            const name = ctx.name || 'Student';
            const dept = ctx.department || 'Department';
            return `👤 **Your Profile Summary**\n\n• **Name**: ${name}\n• **Department**: ${dept}\n• **Semester**: ${ctx.semester || 'N/A'}\n• **CGPA**: ${ctx.cgpa || 'N/A'}\n\n*Visit the Profile section to update your details!*`;
        }

        // Feedback
        if (this.matchesPatterns(lowerMessage, ['feedback', 'complaint', 'suggestion'])) {
            return `📝 **Submit Feedback**\n\nWe value your feedback! Here's how to submit:\n\n1. Navigate to the **Feedback** section\n2. Choose the type (Suggestion/Complaint/Appreciation)\n3. Describe your feedback in detail\n4. Submit!\n\n*Your feedback helps us improve the portal!*`;
        }

        // Thank you
        if (this.matchesPatterns(lowerMessage, ['thank', 'thanks', 'appreciate'])) {
            const thankResponses = [
                "You're welcome! 😊 Let me know if you need anything else.",
                "Happy to help! Feel free to ask more questions anytime.",
                "Glad I could assist! Good luck with your studies! 📚"
            ];
            return thankResponses[Math.floor(Math.random() * thankResponses.length)];
        }

        // Goodbye
        if (this.matchesPatterns(lowerMessage, ['bye', 'goodbye', 'see you', 'later'])) {
            return `Goodbye! 👋 Best of luck with your studies. Feel free to chat anytime you need help!`;
        }

        // Default response
        const defaultResponses = [
            `I'm not quite sure I understand that. Could you rephrase your question?\n\nI can help with:\n• Attendance\n• Grades/CGPA\n• Exams\n• Courses\n• Timetable\n• Study tips`,
            `That's an interesting question! While I may not have the exact answer, try checking the relevant section in the portal or ask me about attendance, grades, or courses.`,
            `I'm still learning! Could you try asking about your attendance, grades, exams, or courses? I'm best at helping with those topics.`
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    matchesPatterns(text, patterns) {
        return patterns.some(pattern => text.includes(pattern));
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.sparkChatbot = new SPARKChatbot();
});