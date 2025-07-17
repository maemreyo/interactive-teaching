# AI Teaching Assistant Setup Guide

## 🤖 Gemini AI Integration + Smart Vocabulary Tooltips

The Teaching Notes tool now includes powerful features to enhance your teaching experience:

### AI Assistant (Powered by Google Gemini)
- Generate student feedback after each lesson
- Create vocabulary review summaries  
- Suggest content for next lessons
- Write professional emails to students/parents
- **Support for Vietnamese and English output**

### Smart Vocabulary Tooltips
- **Random vocabulary reminders** that appear every 15-30 seconds
- **Eye-catching design** with animations and effects
- **Audio pronunciation** for vocabulary words
- **Automatic learning reinforcement** through visual exposure
- **Customizable settings** - enable/disable as needed

## 🔧 Setup Instructions

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Restart Development Server

```bash
pnpm run dev
```

## 📝 How to Use AI Assistant

### 1. Access the Tool
- Click the floating notes button on any unit page
- Switch to the "AI Assistant" tab

### 2. Add Context
- Write notes about the lesson in the "Notes" tab
- Add vocabulary words in the "Vocabulary" tab
- Optionally enter student name and lesson topic

### 3. Generate Content
- Click "Generate Lesson Summary"
- Wait for AI to process your notes and vocabulary
- Review the generated content in different tabs:
  - **Student Feedback**: Encouraging feedback for the student
  - **Vocabulary Review**: Summary of words learned
  - **Next Lesson**: Suggestions for upcoming lessons
  - **Email Content**: Ready-to-send email to student/parents

### 4. Use Generated Content
- Copy content to clipboard
- Download as text files
- Edit and customize as needed

## 🎯 AI Features

### Student Feedback
- Personalized encouragement based on lesson notes
- Specific achievements highlighted
- Constructive suggestions for improvement
- Motivational tone suitable for students

### Vocabulary Review
- Summary of all words learned
- Memory tips and usage suggestions
- Practice activity recommendations
- Organized format for easy review

### Next Lesson Suggestions
- Review activities for current content
- New topics to introduce
- Skills to focus on
- Assessment opportunities

### Email Content
- Professional yet friendly tone
- Complete lesson summary
- Vocabulary list with examples
- Homework suggestions
- Ready to send to students/parents

## 🔒 Privacy & Security

- API calls are made directly from your browser to Google's servers
- No data is stored on our servers
- Your API key is only used locally
- All notes and vocabulary remain in your browser's local storage

## 💡 Tips for Better Results

1. **Write detailed notes**: More context = better AI responses
2. **Include specific examples**: Help AI understand lesson content
3. **Use student names**: Makes feedback more personal
4. **Specify lesson topics**: Helps AI provide relevant suggestions
5. **Review and edit**: AI content is a starting point - customize as needed

## 🚨 Troubleshooting

### "Failed to generate lesson summary"
- Check your API key is correct
- Ensure you have internet connection
- Verify API key has proper permissions

### "Please add some notes or vocabulary"
- Add at least one note or vocabulary item before generating
- AI needs context to create meaningful content

### API Key Not Working
- Make sure you copied the full key
- Check for extra spaces or characters
- Try regenerating the key in Google AI Studio

## 📊 Usage Limits

- Gemini API has usage limits based on your account
- Free tier includes generous limits for teaching use
- Monitor your usage in Google AI Studio
- Consider upgrading if you need higher limits

## 🔄 Updates

The AI features will continue to improve with:
- Better prompt engineering
- More specialized teaching templates
- Additional language support
- Enhanced personalization options