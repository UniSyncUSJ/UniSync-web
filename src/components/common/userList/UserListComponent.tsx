/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Styles from "./userList.module.scss";
import { Delete, Edit, Mail, Save, X } from "lucide-react";
import Modal from "../modal/Modal";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
};

type Props = {
  title: string;
  userList: User[];
};

type ModalHandle = {
  open: () => void;
  close: () => void;
};

function UserListComponent({ title, userList }: Props) {
  const editModalRef = useRef<ModalHandle>(null);
  const deleteModalRef = useRef<ModalHandle>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    editModalRef.current?.open();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Editing user:", selectedUser?.id, editFormData);
    editModalRef.current?.close();
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    deleteModalRef.current?.open();
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting user:", selectedUser?.id);
    deleteModalRef.current?.close();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className={Styles.userCard}>
        <div className={Styles.userCardHeader}>
          <h2>{title}</h2>
        </div>

        <div className={Styles.userList}>
          {(userList ?? []).map((user: User) => (
            <div key={user.id} className={Styles.userItem}>
              <div className={Styles.userInfo}>
                <div className={Styles.userAvatar}>
                  <span>
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </span>
                </div>
                <div className={Styles.userDetails}>
                  <h3 className={Styles.userName}>
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className={Styles.userEmail}>
                    <Mail size={14} />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
              <div className={Styles.userActions}>
                <button
                  className={`${Styles.actionButton} ${Styles.editButton}`}
                  onClick={() => handleEditClick(user)}
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  className={`${Styles.actionButton} ${Styles.deleteButton}`}
                  onClick={() => handleDeleteClick(user)}
                >
                  <Delete size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal ref={editModalRef}>
        <div className={Styles.modalContent}>
          <div className={Styles.modalHeader}>
            <h3>Edit User</h3>
            <button
              className={Styles.closeButton}
              onClick={() => editModalRef.current?.close()}
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleEditSubmit} className={Styles.modalForm}>
            <div className={Styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={editFormData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={Styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={editFormData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={Styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editFormData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={Styles.modalActions}>
              <button
                type="button"
                className={`${Styles.modalButton} ${Styles.cancelButton}`}
                onClick={() => editModalRef.current?.close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${Styles.modalButton} ${Styles.saveButton}`}
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal ref={deleteModalRef}>
        <div className={Styles.modalContent}>
          <div className={Styles.modalHeader}>
            <h3>Delete User</h3>
            <button
              className={Styles.closeButton}
              onClick={() => deleteModalRef.current?.close()}
            >
              <X size={20} />
            </button>
          </div>
          <div className={Styles.modalBody}>
            <div className={Styles.warningIcon}>
              <Delete size={48} />
            </div>
            <p>
              Are you sure you want to delete{" "}
              <strong>
                {selectedUser?.firstName} {selectedUser?.lastName}
              </strong>
              ?
            </p>
            <p className={Styles.warningText}>This action cannot be undone.</p>
          </div>
          <div className={Styles.modalActions}>
            <button
              type="button"
              className={`${Styles.modalButton} ${Styles.cancelButton}`}
              onClick={() => deleteModalRef.current?.close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${Styles.modalButton} ${Styles.dangerButton}`}
              onClick={handleDeleteConfirm}
            >
              <Delete size={16} />
              Delete User
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UserListComponent;
