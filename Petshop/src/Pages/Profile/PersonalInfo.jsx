import useAuthStore from "../Store/useAuthStore";

const PersonalInfo = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="info-container">
      {/* Personal Information Section */}
      <div className="info-box">
        <h3>Personal Information</h3>
        {authUser ? (
          <ul className="info-list">
            <li>
              <strong>Name:</strong> {authUser.fullName}
            </li>
            <li>
              <strong>Email:</strong> {authUser.email}
            </li>
            <li>
              <strong>Phone:</strong> {authUser.phone || "Not provided"}
            </li>
            <li>
              <strong>City:</strong> {authUser.city || "Not provided"}
            </li>
            <li>
              <strong>Zip:</strong> {authUser.zip || "Not provided"}
            </li>
          </ul>
        ) : (
          <p>No user information available.</p>
        )}
      </div>

      {/* Shop Information Section */}
     
    </div>
  );
};

export default PersonalInfo;
