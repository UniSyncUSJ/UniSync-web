import React, { useState } from "react";
import { User, Edit, Save, Upload } from "lucide-react";
import styles from "./settings.module.scss";

const SettingsComponent = () => {
  //   const [activeTab, setActiveTab] = useState("settings");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    clubName: "Faculty of Applied Sciences",
    description:
      "Welcome to the Faculty of Applied Sciences. We are dedicated to providing quality education and fostering innovation in scientific research and applications.",
    contactInfo: "Email: info@appliedsciences.edu | Phone: +1 (555) 123-4567",
  });

  const handleInputChange = (
    field: keyof typeof profileData,
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving profile data:", profileData);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleProfilePicUpload = () => {
    // Handle profile picture upload
    console.log("Upload profile picture");
  };

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.mainContent}>
        {/* <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>Settings</h1>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.notificationBadge}>
              <Bell size={20} />
            </div>
            <span>Admin User</span>
            <button className={styles.logoutBtn}>Logout</button>
          </div>
        </header> */}

        <main className={styles.contentArea}>
          <div className={styles.settingsContainer}>
            <div className={styles.profileSection}>
              <div className={styles.profileHeader}>
                <h3>Profile Settings</h3>
              </div>

              <div className={styles.profileContent}>
                <div className={styles.profilePicSection}>
                  <div className={styles.profilePicContainer}>
                    <div className={styles.profilePic}>
                      <User size={40} />
                    </div>
                    <button
                      className={styles.uploadBtn}
                      onClick={handleProfilePicUpload}
                    >
                      <Upload size={16} />
                      Upload
                    </button>
                  </div>
                </div>

                <div className={styles.profileForm}>
                  <div className={styles.formGroup}>
                    <label>Club Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.clubName}
                        onChange={(e) =>
                          handleInputChange("clubName", e.target.value)
                        }
                      />
                    ) : (
                      <div className={styles.displayValue}>
                        {profileData.clubName}
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Description</label>
                    {isEditing ? (
                      <textarea
                        value={profileData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={4}
                      />
                    ) : (
                      <div className={styles.displayValue}>
                        {profileData.description}
                      </div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Contact Info</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.contactInfo}
                        onChange={(e) =>
                          handleInputChange("contactInfo", e.target.value)
                        }
                      />
                    ) : (
                      <div className={styles.displayValue}>
                        {profileData.contactInfo}
                      </div>
                    )}
                  </div>

                  <div className={styles.formActions}>
                    {isEditing ? (
                      <button className={styles.saveBtn} onClick={handleSave}>
                        <Save size={16} />
                        Save
                      </button>
                    ) : (
                      <button className={styles.editBtn} onClick={handleEdit}>
                        <Edit size={16} />
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsComponent;
