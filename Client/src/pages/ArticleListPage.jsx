import { Link } from 'react-router-dom';
import ProfileLayout from '../components/ProfileLayout';
import testIMAGE from '../assets/testImage.png';

function ArticleList() {
  const articles = [
    { id: 1, title: 'How I Built My QR Payment App', summary: 'Using Kivy and QR scanning for jeepney fare' },
    { id: 2, title: 'My Experience Joining Solana Hackathon', summary: 'Building offline blockchain apps' },
    { id: 3, title: 'Building EcoTrack for BATELEC', summary: 'Real-time energy usage tracker using IoT' }
  ];

  const description = (
    <div>
      <p style={{ color: '#cccccc' }}>Welcome to my collection of project write-ups and articles! 👨‍💻</p>
      <ul style={{ marginTop: '20px', paddingLeft: '20px' }}>
        {articles.map((article) => (
          <li key={article.id} style={{ marginBottom: '16px' }}>
            <strong>
              <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: '#ff9900' }}>
                {article.title}
              </Link>
            </strong>
            <br />
            <span style={{ fontSize: '0.95rem', color: '#aaaaaa' }}>{article.summary}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <ProfileLayout
      title="My Articles"
      description={description}
      handle="github.com/luislaguardia"
      image={testIMAGE}
    />
  );
}

export default ArticleList;
