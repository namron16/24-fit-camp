import React, { useMemo, useState } from "react";
import { useFetchTrainerDetails } from "../../utils/FetchData";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEditTrainer } from "../../utils/FetchData";
import userIcon from "../../assets/user-avatar-filled-alt.svg";
import "./trainerdetail.css";

const TrainerDetails = () => {
  const { trainerId } = useParams();
  const { trainerDetails } = useFetchTrainerDetails(trainerId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { editTrainer } = useEditTrainer(trainerId);
  const trainerData = useMemo(
    () => ({
      firstName: trainerDetails?.data?.firstName || "",
      lastName: trainerDetails?.data?.lastName || "",
      email: trainerDetails?.data?.email || "",
      contact: trainerDetails?.data?.contact || "",
      trainerId: trainerDetails?.data?.id || "",
      img: trainerDetails?.data?.img,
    }),
    [trainerDetails]
  );

  React.useEffect(() => {
    if (trainerDetails?.data) {
      setFormData({
        firstName: trainerDetails.data.firstName || "",
        lastName: trainerDetails.data.lastName || "",
        email: trainerDetails.data.email || "",
        contact: trainerDetails.data.contact || "",
      });
    }
  }, [trainerDetails]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setPreviewImage(null);
      setSelectedImage(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      img: previewImage || trainerData.img,
    };

    try {
      await editTrainer(updatedData);
      alert("Trainer details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating trainer details:", error);
      alert("Failed to update trainer details. Please try again.");
    }
  };

  return (
    <section className="trainer-details">
      <div className="trainer-bg-overlay">
        <NavLink to=".." relative="path">
          <span>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
          <span>Back to Trainers</span>
        </NavLink>
        <img
          src={previewImage || trainerData.img || userIcon}
          className="trainer-detail-icon"
          loading="lazy"
          alt="Trainer avatar"
        />
        {isEditing && (
          <div className="image-upload-overlay">
            <label htmlFor="profile-image" className="image-upload-btn">
              <i className="fa-solid fa-camera"></i>
            </label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        )}
      </div>

      <div className="trainer-details__container">
        <div className="trainer-info">
          <div className="trainer-header">
            {!isEditing ? (
              <h1 className="trainer-name">{`${trainerData.firstName} ${trainerData.lastName}`}</h1>
            ) : (
              <div className="edit-name-fields">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="edit-input"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="edit-input"
                />
              </div>
            )}

            <button
              className={`edit-button ${isEditing ? "save-mode" : ""}`}
              onClick={isEditing ? handleSubmit : handleEditToggle}
            >
              {isEditing ? (
                <>
                  <i className="fa-solid fa-save"></i> Save
                </>
              ) : (
                <>
                  <i className="fa-solid fa-edit"></i> Edit
                </>
              )}
            </button>

            {isEditing && (
              <button className="cancel-button" onClick={handleEditToggle}>
                <i className="fa-solid fa-times"></i> Cancel
              </button>
            )}
          </div>

          <div className="trainer-info__container">
            <div className="trainer-info-card">
              {!isEditing ? (
                <>
                  <div className="trainer-info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{trainerData.email}</span>
                  </div>

                  <div className="trainer-info-item">
                    <span className="info-label">Contact:</span>
                    <span className="info-value">{trainerData.contact}</span>
                  </div>

                  <div className="trainer-info-item">
                    <span className="info-label">Trainer ID:</span>
                    <span className="info-value">{trainerData.trainerId}</span>
                  </div>
                </>
              ) : (
                <form className="edit-form">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact">Contact:</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact || ""}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="trainerId">Trainer ID:</label>
                    <input
                      type="text"
                      id="trainerId"
                      value={trainerData.trainerId}
                      disabled
                      className="edit-input disabled"
                    />
                    <small>ID cannot be changed</small>
                  </div>
                </form>
              )}
            </div>

            <div className="trainer-stats">
              <div className="stats-card">
                <h3>Schedule</h3>
                <p>Mon-Fri: 9AM - 5PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerDetails;
