import ProfileLayout from '../components/ProfileLayout';
import whoisImage from '../assets/whois.png';

function AboutPage() {
  return (
    <ProfileLayout
      title="Who is Luis?"
      description="I'm currently studying Bachelor of Science in Information Technology at National University Manila. Outside of coding, I enjoy solving puzzles, exploring new technologies, and working on real-world capstone projects. I’m also involved in the Microsoft Student Community."
      handle="BSIT-MWA | Class of 2025"
      image={whoisImage}      />
  );
}

export default AboutPage;
