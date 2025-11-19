Gen AI Quiz is a modern and responsive quiz application built using HTML, CSS and JavaScript.
The project is designed to generate multiple-choice questions using artificial intelligence (optional) while also supporting a built-in mock question mode for local demos.

The frontend is completely static and can be deployed on GitHub Pages, Netlify or Vercel.
It includes a clean UI, question navigation, scoring, and automatic progression after selecting an answer.

An optional backend can be added if AI-generated questions are required.
The frontend expects a backend endpoint that returns an array of questions in JSON format.
Each question should include the question text, four options and the correct answer.
If the backend is not available, the application will automatically fall back to mock questions, ensuring the quiz works even without AI.

The backend is not included in this repository by default.
However, you can use any server technology (Node.js, Python, PHP, etc.) to create an endpoint that the frontend can call.
The backend should handle the AI model integration securely and must keep any API keys private.
API keys should never be placed in frontend code.

This project is ideal for demonstrating both frontend UI skills and backend integration using AI.
It can be used for intern tasks, college projects, portfolio websites or AI demo applications.
