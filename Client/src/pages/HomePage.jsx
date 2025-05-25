import ProfileLayout from '../components/ProfileLayout';
import laguardiaIMG from '../assets/laguardia.jpg';

function HomePage() {
  const description = (
    <div>
      <p>
        I’m Luis Laguardia — a passionate tech student from NU Manila, exploring the world of full-stack development, mobile apps, and cybersecurity.
      </p>
      <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#ff9900' }}>
        “I can always just die after graduation.” – me, jokingly, but also kinda seriously.
      </p>
    </div>
  );

  return (
    <ProfileLayout
      title="Luis Laguardia"
      description={description}
      handle="@luislaguardia.com"
      image={laguardiaIMG}
    />
  );
}

export default HomePage;
