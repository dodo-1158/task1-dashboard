"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
// import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import styles from "./page.module.css"; // Import the CSS module

interface User {
  id: string;
  name: string;
}

interface SubDepartment {
  id: string;
  name: string;
  description: string;
  users: User[];
}

const SubDepartmentPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : params.id[0]; // Ensure id is a string
  const [subDepartment, setSubDepartment] = useState<SubDepartment | null>(null);
  const [newUser, setNewUser] = useState("");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (id) {
      const initialData: SubDepartment =
        id === "1"
          ? {
            id,
            name: "IT",
            description: "Information Technology Department",
            users: [{ id: "1", name: "Shikha Sharma" }],
          }
          : id === "2"
            ? {
              id,
              name: "HR",
              description: "HR ZINDABAD",
              users: [{ id: "1", name: "Shikha Sharma" }],
            }
            : id === "3"
              ? {
                id,
                name: "Marketing",
                description: "Market wale",
                users: [{ id: "1", name: "Shikha Sharma" }],
              }
              : null;

      setSubDepartment(initialData);
    }
  }, [id]);

  const handleAddUser = () => {
    if (newUser.trim()) {
      const updatedUsers = [
        ...(subDepartment?.users || []),
        { id: Math.random().toString(), name: newUser },
      ];
      setSubDepartment((prev) =>
        prev ? { ...prev, users: updatedUsers } : null
      );
      setNewUser("");
    }
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers =
      subDepartment?.users.filter((user) => user.id !== userId) || [];
    setSubDepartment((prev) =>
      prev ? { ...prev, users: updatedUsers } : null
    );
  };

  const startEditingUser = (userId: string, currentName: string) => {
    setEditingUserId(userId);
    setEditedName(currentName);
  };

  const saveEditedUser = () => {
    const updatedUsers =
      subDepartment?.users.map((user) =>
        user.id === editingUserId ? { ...user, name: editedName } : user
      ) || [];
    setSubDepartment((prev) =>
      prev ? { ...prev, users: updatedUsers } : null
    );
    setEditingUserId(null);
    setEditedName("");
  };

  if (!id || !subDepartment) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.subDepartment}>
      {/* <Breadcrumb path={["Departments", subDepartment.name]} /> */}
      <div className={styles.header}>
        <h1 className={styles.title}>{subDepartment.name}</h1>
        <p className={styles.description}>{subDepartment.description}</p>
      </div>

      <div className={styles.usersSection}>
        <h2 className={styles.usersTitle}>Users</h2>
        <ul className={styles.usersList}>
          {subDepartment.users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              {editingUserId === user.id ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={styles.userInput}
                  />
                  <div className={styles.userActions}>
                    <button
                      onClick={saveEditedUser}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{user.name}</span>
                  <div className={styles.userActions}>
                    <button
                      onClick={() => startEditingUser(user.id, user.name)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.addUserSection}>
          <input
            type="text"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            placeholder="Add new user"
            className={styles.addUserInput}
          />
          <button onClick={handleAddUser} className={styles.addUserButton}>
            Add User
          </button>
        </div>
      </div>

      <button onClick={() => router.back()} className={styles.backButton}>
        Back to Departments
      </button>
    </div>
  );
};

export default SubDepartmentPage;
