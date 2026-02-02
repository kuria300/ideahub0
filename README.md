# Origin – Developer Idea Collaboration App

Origin is a frontend web application that connects developers through startup ideas. It allows users to share project ideas, explore ideas from other developers, and present their GitHub work to encourage collaboration.

---

## Project Overview

Many developers have strong ideas but struggle to find the right teammates to build with. DevConnect provides a focused platform where developers can post ideas, showcase their skills, and discover others who are interested in building real projects together.

This project is built as a frontend prototype and uses a simulated database instead of a real backend.

---

## Core Features

### Login Page
Users can log in to access the platform. Authentication is simulated for demonstration purposes using google Oauth(implict flow) and normal email/password.

### Homepage
The homepage displays startup ideas created by different developers. Ideas appear as cards containing the idea title, short description, and creator information.

### Create Idea Page
Users can submit new startup ideas by entering the idea title, problem it solves, description. Submitted ideas are stored in the simulated database and shown on the homepage.

### Profile Page
Each user has a profile that includes their name, bio, GitHub link, and a list of ideas they have posted. This helps other users understand their background and technical ability.

---

## Technologies Used

- Vite – Development environment  
- React.js – User interface built with reusable components  
- React Router DOM – Page navigation  
- db.json – Simulated database for development  
- CSS – Styling and layout  
- Git & GitHub – Version control  

---

## How It Works

1. The user logs in.  
2. The user is redirected to the homepage.  
3. The homepage displays ideas from various developers.  
4. Users can post new ideas through the Create Idea page.  
5. Ideas are saved in db.json and displayed in the idea feed.  
6. The Profile page shows user details and their posted i

