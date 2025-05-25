import { useParams, useNavigate } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import qrIMG from '../assets/qr.png';
import SOLANA from '../assets/solanaa.png';
import ecotrackIMG from '../assets/ecotrack.jpg';
import notFound from '../assets/bearnot.png';

function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const content = {
    1: {
      title: "How I Built My QR Payment App",
      body: "Using Kivy and Python, I developed a QR scanner app that integrates payments for jeepneys in the Philippines. It was my first time using OpenCV and SQLite for mobile.",
      image: qrIMG
    },
    2: {
      title: "My Experience Joining Solana Hackathon",
      body: "The Solana Hackathon challenged me to think about offline blockchain use. I prototyped a sidechain payment system with offline sync, all built in React and Solana CLI.",
      image: SOLANA
    },
    3: {
      title: "Building EcoTrack for BATELEC",
      body: "This project helps track household energy consumption using IoT devices like SwitchBot and Sonoff, paired with a Flutter dashboard for visualization and alerts.",
      image: ecotrackIMG
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
      <button onClick={() => navigate('/articles')} style={{
        marginTop: '20px',
        padding: '10px 16px',
        backgroundColor: '#ff9900',
        color: '#1e1e1e',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        ← Back to Articles
      </button>
    </div>
  );

  return (
    <ProfileLayout
      title={article.title}
      description={description}
      handle="@luislaguardia.com"
      image={article.image}
    />
  );
}

export default ArticlePage;
