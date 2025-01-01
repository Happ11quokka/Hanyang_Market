// src/pages/About.jsx
export default function About() {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
            About This Project
          </h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            This project is the culmination of the concepts learned during the Hanyang University Programming Central Club, FORIF study sessions. It represents a practical application of the knowledge gained and serves as my final project for the study.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Throughout the development process, I heavily utilized the power of ChatGPT, which significantly contributed to solving complex problems and providing valuable insights. To ensure that beginners can learn and follow along, I meticulously documented everything in Notion, making it easy for anyone to understand and replicate this project.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Follow Me</h2>
          <ul className="text-lg text-gray-600 space-y-2">
            <li>
              <strong>Instagram:</strong> <a href="https://www.instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Your Instagram Handle</a>
            </li>
            <li>
              <strong>GitHub:</strong> <a href="https://github.com/your_github_handle" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Your GitHub Handle</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }