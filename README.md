# Media Bias Analyzer – Frontend

This repository contains the **frontend interface** for the *Media Bias Analyzer* project.  
The frontend provides a structured and interpretable user interface for submitting textual content and viewing AI-assisted media bias analysis results.

The application is designed to support **critical evaluation of media content**, including news articles, opinion pieces, and social media text, with a focus on transparency and explainability rather than automated judgment.

---

## Project Overview

The frontend allows users to input text for analysis and visualizes the results returned by the backend in a clear and accessible format. Instead of exposing raw model outputs, the interface presents structured insights such as bias classification, confidence estimation, highlighted sentences, detected techniques, and explanatory context.

This project emphasizes **responsible AI usage**, ensuring that outputs are presented as analytical assistance rather than authoritative conclusions.

---

## Features

- Text input for media bias analysis  
- Clear visualization of:
  - Bias level (Low / Medium / High)
  - Confidence score
  - Biased or emotionally framed sentences
  - Detected narrative or manipulation techniques
  - Explanatory reasoning
- Clean and responsive UI
- Centralized API configuration for easy backend integration
- Designed for research, experimentation, and critical media analysis

---

## Backend Integration

This frontend consumes data from a dedicated backend service responsible for:
- AI inference
- Content analysis
- Parsing and structuring results
- Data persistence

The backend repository can be found here:

🔗 **Server Repository:**  
https://github.com/Muzamil-Gashroo/Bias-Detector-Server/tree/master

---

## Technology Stack

- React (with TypeScript)
- Vite
- Modern component-based architecture
- API-driven data flow
- Clean separation of UI and business logic

---

## Usage Note

Some publishers restrict automated access to their content. In such cases, users may need to paste article text directly rather than relying on URL-based extraction.

---

## Disclaimer

This is an **open-source research and educational project**.  
The analysis is generated using probabilistic language models and may contain inaccuracies or subjective interpretations.  
The tool does **not** provide legal, political, or journalistic advice and should not be treated as an authoritative source.

---

## Author

**Muzamil Gashroo**  
GitHub: https://github.com/Muzamil-Gashroo  
LinkedIn: https://www.linkedin.com/in/muzamil-bashir-gashroo-8268b4228/

---

## License

This project is released as open-source software.  
Users are encouraged to review, modify, and extend it responsibly.
