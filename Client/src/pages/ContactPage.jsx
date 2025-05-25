import ProfileLayout from '../components/ProfileLayout';
import getinTouch from '../assets/getintouch.png';

function ContactPage() {
  return (
    <ProfileLayout
      title="Get in Touch"
      description="Interested in collaborating, hiring, or just want to say hello? I’m always open to discussing tech, projects, or anything in between. Shoot me a message via email or connect with me on my socials!"
      handle="📧 laguardialuisgabriel@gmail.com"
      image={getinTouch}
    />
  );
}

export default ContactPage;
