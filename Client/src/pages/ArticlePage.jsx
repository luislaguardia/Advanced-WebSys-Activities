import { useParams, useNavigate } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import qrIMG from '../assets/qr.png';
import SOLANA from '../assets/solanaa.png';
import ecotrackIMG from '../assets/ecotrackwebdevlogo.png';
import notFound from '../assets/bearnot.png';
import panicIMG from '../assets/panicpin.png';
import budolIMG from '../assets/budolblocker.png';
import cipherIMG from '../assets/caesar.png';

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const content = {
    1: {
      title: "How I Built My QR Payment App",
      body: `Using Kivy and Python, I developed a mobile QR scanner and payment application aimed at modernizing jeepney fare collection in the Philippines. The app lets commuters scan a merchant’s QR code to instantly log and process payment transactions. I used OpenCV for QR recognition, SQLite for offline transaction storage, and integrated user-friendly UI with Kivy. The project sparked my interest in fintech and contactless systems for public transportation.`,
      image: qrIMG
    },
    2: {
      title: "My Experience Joining Solana Hackathon",
      body: `The Solana Hackathon pushed me to innovate around real-world blockchain limitations. I built a sidechain-based offline payment prototype for disconnected environments like rural stores and tricycles. The system caches Solana transactions locally and syncs them when the internet resumes. I used Solana CLI, Rust smart contracts, and a React-based frontend wallet interface. It was a deep dive into how Web3 can empower unbanked communities.`,
      image: SOLANA
    },
    3: {
      title: "Building EcoTrack for BATELEC",
      body: `EcoTrack is an IoT-powered energy monitoring solution for Filipino households, developed for BATELEC I consumers. It integrates smart plug specifically Tasmota Flashed Plugs with a Flutter mobile dashboard to visualize real-time and historical energy usage. Users receive weekly summaries, detect high consumption patterns, and access news alerts. My team and I engineered the backend using Node.js with MongoDB and built a responsive admin panel in React for managing users, devices, and content.`,
      image: ecotrackIMG
    },
    4: {
      title: "Panic PIN: Smart Emergency SMS App",
      body: `Panic PIN is an Android safety app designed for discreet emergencies. The app allows users to trigger an emergency alert by entering a fake PIN on the lock screen. It sends a silent SMS containing the user's location and a preset message to emergency contacts. Developed using Java, Android Studio, and Firebase for authentication and location tracking, Panic PIN won 2nd place in our university's IT Security Hackathon. It focuses on stealth and speed in high-risk situations, such as abduction or harassment.`,
      image: panicIMG
    },
    5: {
      title: "BudolBlocker.AI: Scam Detection Extension",
      body: `BudolBlocker.AI is a browser extension designed to protect users from online scam posts and fraud. It uses EasyOCR to extract text from images (like giveaways or suspicious promos), then runs that text through a fine-tuned BERT model via a FastAPI backend to classify potential scams. The frontend was built with React and seamlessly integrates with Chrome's DOM. BudolBlocker.AI empowers users to detect and report sketchy content in real time, and has been demonstrated at a university research symposium.`,
      image: budolIMG
    },
    6: {
      title: "Caesar Cipher App in Python",
      body: `This beginner-level cryptography project is a Python implementation of the Caesar Cipher – a substitution cipher where each letter in the plaintext is shifted by a fixed number of places. The app supports both encryption and decryption, and handles both uppercase and lowercase letters. This project helped me understand basic encryption logic and string manipulation in Python. It's a simple tool but a useful stepping stone into cybersecurity and algorithm design.`,
      image: cipherIMG
    }
  };

  const article = content[id] || {
    title: "Article Not Found",
    body: "Sorry, no article found.",
    image: notFound
  };

  const description = (
    <div>
      <p>{article.body}</p>
      <button
        onClick={() => navigate('/articles')}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: '#ff9900',
          color: '#1e1e1e',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
      Back to Articles
      </button>
    </div>
  );

  return (
    <ProfileLayout
      title={article.title}
      description={description}
      image={article.image}
    />
  );
}

export default ArticlePage;