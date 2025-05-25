import '../styles/ProfileLayout.css';

function ProfileLayout({ title, description, handle, image }) {
  return (
    <div className="profile-container">
      <div className="profile-text">
        <h1>{title}</h1>
        <p>{description}</p>
        {handle && <p className="handle">{handle}</p>}
        <div className="icons">
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>
      </div>
      <div className="profile-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}

export default ProfileLayout;
