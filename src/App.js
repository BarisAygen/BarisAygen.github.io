import React from 'react';
import './App.css';

function App() {
  const projects = [
    {
      id: 1,
      title: "Project Name 1",
      description: "This is a detailed description of the first project. It explains the technologies used, the problem it solves, and the key features implemented. The description provides enough context for visitors to understand the scope and impact of the work.",
      technologies: ["React", "Node.js", "MongoDB"],
      screenshots: [
        { src: "/img/lalaland.png", aspectRatio: "16:9" },
        { src: "/img/github.png", aspectRatio: "9:16" },
        { src: "/img/linkedin.png", aspectRatio: "9:16" },
        { src: "/img/Instagram.png", aspectRatio: "16:9" },
        { src: "/img/Spotify.png", aspectRatio: "4:4" },
        { src: "/img/vsco.png", aspectRatio: "16:9" }
      ]
    },
    {
      id: 2,
      title: "Project Name 2",
      description: "Description of the second project showcasing different skills and technologies. This project demonstrates expertise in another area and shows versatility in problem-solving approaches and technical implementation.",
      technologies: ["Python", "Django", "PostgreSQL"],
      screenshots: [
        { src: "/img/letterboxd.png", aspectRatio: "9:16" },
        { src: "/img/blogger.png", aspectRatio: "9:16" },
        { src: "/img/lalaland.png", aspectRatio: "16:9" },
        { src: "/img/github.png", aspectRatio: "4:4" },
        { src: "/img/linkedin.png", aspectRatio: "16:9" },
        { src: "/img/Instagram.png", aspectRatio: "9:16" }
      ]
    },
    {
      id: 3,
      title: "Project Name 3",
      description: "A comprehensive project that demonstrates full-stack development capabilities. This project includes both frontend and backend components, showcasing the ability to work across the entire technology stack and deliver complete solutions.",
      technologies: ["Vue.js", "Express", "MySQL"],
      screenshots: [
        { src: "/img/Spotify.png", aspectRatio: "4:4" },
        { src: "/img/vsco.png", aspectRatio: "16:9" },
        { src: "/img/letterboxd.png", aspectRatio: "9:16" },
        { src: "/img/blogger.png", aspectRatio: "9:16" },
        { src: "/img/lalaland.png", aspectRatio: "16:9" },
        { src: "/img/github.png", aspectRatio: "4:4" }
      ]
    }
  ];

  const handleScreenshotClick = (e) => {
    // Add click effect
    e.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
      e.target.style.transform = '';
    }, 150);
  };

  const handleContactClick = (e) => {
    // Add ripple effect
    const ripple = document.createElement('span');
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    e.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const getScreenshotClass = (aspectRatio) => {
    switch(aspectRatio) {
      case "9:16":
        return "screenshot portrait";
      case "16:9":
        return "screenshot landscape";
      case "4:4":
        return "screenshot square";
      default:
        return "screenshot";
    }
  };

  const renderScreenshots = (screenshots) => {
    const columns = [[], []]; // Two columns
    let currentColumn = 0;
    let columnHeights = [0, 0]; // Track height of each column

    screenshots.forEach((screenshot) => {
      let screenshotHeight, screenshotWidth;
      
      switch(screenshot.aspectRatio) {
        case "9:16": // Tall - takes full column height
          screenshotHeight = 300;
          screenshotWidth = 169; // 9:16 ratio
          break;
        case "16:9": // Wide - spans both columns
          screenshotHeight = 150;
          screenshotWidth = 400; // Spans full width
          break;
        case "4:4": // Square - goes in shortest column
          screenshotHeight = 200;
          screenshotWidth = 200;
          break;
        default:
          screenshotHeight = 200;
          screenshotWidth = 200;
      }

      if (screenshot.aspectRatio === "16:9") {
        // Wide images span both columns
        columns[0].push({ ...screenshot, width: screenshotWidth, height: screenshotHeight, spansBoth: true });
        columns[1].push({ ...screenshot, width: screenshotWidth, height: screenshotHeight, spansBoth: true });
        columnHeights[0] += screenshotHeight + 16; // Add gap
        columnHeights[1] += screenshotHeight + 16;
      } else {
        // Find the shortest column for square/tall images
        const shortestColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1;
        columns[shortestColumn].push({ ...screenshot, width: screenshotWidth, height: screenshotHeight, spansBoth: false });
        columnHeights[shortestColumn] += screenshotHeight + 16; // Add gap
      }
    });

    return columns;
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/img/lalaland.png" alt="Logo" className="logo" />
            <h1 className="page-title">Baris Aygen</h1>
          </div>
          <div className="contact-links">
            <a 
              href="https://linktr.ee/barisaygen" 
              className="contact-link" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleContactClick}
            >
              <i className="fas fa-link"></i>
              <span>Linktree</span>
            </a>
            <a 
              href="mailto:barisaygen@gmail.com" 
              className="contact-link"
              onClick={handleContactClick}
            >
              <i className="fas fa-envelope"></i>
              <span>Email</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {projects.map((project, index) => {
          const screenshotColumns = renderScreenshots(project.screenshots);
          
          return (
            <section key={project.id} className="project-row">
              <div className="project-info">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-screenshots-container">
                <div className="project-screenshots">
                  <div className="screenshot-columns">
                    {screenshotColumns.map((column, columnIndex) => (
                      <div key={columnIndex} className="screenshot-column">
                        {column.map((screenshot, screenshotIndex) => (
                          <img 
                            key={screenshotIndex}
                            src={screenshot.src} 
                            alt={`${project.title} Screenshot ${screenshotIndex + 1}`} 
                            className={`screenshot ${getScreenshotClass(screenshot.aspectRatio)} ${screenshot.spansBoth ? 'spans-both' : ''}`}
                            style={{
                              width: screenshot.spansBoth ? '100%' : screenshot.width,
                              height: screenshot.height
                            }}
                            onClick={handleScreenshotClick}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;
