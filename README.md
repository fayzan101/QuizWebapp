# Quiz Web App

A full-featured quiz web application built using TypeScript. This app allows users to take quizzes across various courses, securely stores quiz results, and provides an admin dashboard for managing and reviewing quiz records. Anti-cheating measures are in place to ensure quiz integrity.

## Features

Multi-course Quiz System:
Supports quizzes for multiple courses/topics.
Result Tracking: 
Automatically saves quiz scores and relevant data.
Admin Dashboard: 
  - Admins can log in securely.
  - View all student quiz records.
  - Monitor performance across courses.
  Anti-Cheating: 
  - Tab switching during a quiz leads to automatic disqualification.
  - The system gives a score of 0 if a user switches tabs during an active quiz.

## Firebase Integration

This project uses Firebase as its database solution. Firebase will be used to store quiz data and sync quiz results between different devices. This allows users to start a quiz on one device and continue it on another seamlessly, while also providing real-time updates to quiz results.


## Technologies Used
Frontend: TypeScript, HTML, CSS
Backend: Node.js / Express (or your backend stack)
Database: MongoDB / PostgreSQL / (whichever you're using)
Authentication: JWT / Session-based auth (depending on your implementation)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiz-web-app.git
   cd quiz-web-app
   
