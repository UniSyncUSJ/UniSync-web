import React, { useState } from "react";
import { User, Edit, Save, Upload } from "lucide-react";
import styles from "./settings.module.scss";
import { useSelector } from "react-redux";

const SettingsComponent = () => {
  const admin = useSelector(
    (state: {
      admin: {
        id: number;
        image: string;
        clubName: string;
        description: string;
        email: string;
        contactInfo: string;
      };
    }) => state.admin
  );

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    clubName: admin.clubName,
    description: admin.description,
    email: admin.email,
    contactInfo: admin.contactInfo,
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
                    <input type="text" value={profileData.clubName} disabled />
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
                    <label htmlFor="email">Email</label>

                    <input type="text" value={profileData.email} disabled />

                    <label htmlFor="contact">Contact Number</label>
                    <input
                      type="text"
                      value={profileData.contactInfo}
                      onChange={(e) =>
                        handleInputChange("contactInfo", e.target.value)
                      }
                    />
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
