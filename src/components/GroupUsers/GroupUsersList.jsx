"use client"
import React, { useState } from 'react';
import { UserPlus, PencilLine, Trash2, Search, X } from 'lucide-react';
import styles from './page.module.css';

const Modal = ({ title, onClose, children }) => (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
                {title}
                <button onClick={onClose}>
                    <X size={20} />
                </button>
            </div>
            <div className={styles.modalBody}>
                {children}
            </div>
        </div>
    </div>
);

const GroupUsersList = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Shikha Sharma', role: 'ADMIN' },
        { id: 2, name: 'Shikha Sharma', role: 'USER' }
    ]);

    const [existingUsers] = useState([
        { id: 3, name: 'Ali Khan' },
        { id: 4, name: 'John Doe' },
        { id: 5, name: 'Jane Smith' }
    ]);

    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newUserData, setNewUserData] = useState({ name: '', email: '', role: 'USER' });

    const filteredUsers = existingUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !users.some(existingUser => existingUser.id === user.id)
    );

    const handleAddSelectedUsers = () => {
        if (isCreatingNew) {
            const newUser = {
                id: Math.max(...users.map(u => u.id), 0) + 1,
                name: newUserData.name,
                email: newUserData.email,
                role: newUserData.role
            };
            setUsers([...users, newUser]);
        } else {
            const newUsers = selectedUsers.map(user => ({
                ...user,
                role: 'USER'
            }));
            setUsers([...users, ...newUsers]);
        }
        handleCloseAddModal();
    };

    const handleCloseAddModal = () => {
        setIsAddingUser(false);
        setSelectedUsers([]);
        setSearchQuery('');
        setIsCreatingNew(false);
        setNewUserData({ name: '', email: '', role: 'USER' });
    };

    const handleUserSelect = (user) => {
        if (selectedUsers.some(selected => selected.id === user.id)) {
            setSelectedUsers(selectedUsers.filter(selected => selected.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleEditRole = (userId) => {
        setEditingUserId(userId);
        setIsEditingRole(true);
    };

    const handleUpdateRole = (newRole) => {
        setUsers(users.map(user =>
            user.id === editingUserId ? { ...user, role: newRole } : user
        ));
        setIsEditingRole(false);
        setEditingUserId(null);
    };

    const handleRemoveUser = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>GROUP USERS</h2>
                <button
                    onClick={() => setIsAddingUser(true)}
                    className={styles.addButton}
                >
                    <UserPlus size={18} />
                    <span>User</span>
                </button>
            </div>

            {isAddingUser && (
                <Modal title="Add User" onClose={handleCloseAddModal} >
                    <div className={styles.tabButtons}>
                        <button
                            onClick={() => setIsCreatingNew(false)}
                            className={`${styles.tabButton} ${!isCreatingNew ? styles.activeTab : styles.inactiveTab}`}
                        >
                            Search Users
                        </button>
                        <button
                            onClick={() => setIsCreatingNew(true)}
                            className={`${styles.tabButton} ${isCreatingNew ? styles.activeTab : styles.inactiveTab}`}
                        >
                            Create New
                        </button>
                    </div>

                    {isCreatingNew ? (
                        <div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Name</label>
                                <input
                                    type="text"
                                    value={newUserData.name}
                                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                                    className={styles.input}
                                    placeholder="Enter name"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    value={newUserData.email}
                                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                                    className={styles.input}
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Role</label>
                                <select
                                    value={newUserData.role}
                                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                                    className={styles.select}
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.searchInput}>
                                <Search className={styles.searchIcon} size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search User"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.usersList}>
                                {filteredUsers.map(user => (
                                    <div
                                        key={user.id}
                                        onClick={() => handleUserSelect(user)}
                                        className={`${styles.userItem} ${selectedUsers.some(selected => selected.id === user.id)
                                            ? styles.userItemSelected
                                            : ''
                                            }`}
                                    >
                                        <div className={styles.avatar}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <span>{user.name}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <div className={styles.modalFooter}>
                        <button
                            onClick={handleCloseAddModal}
                            className={`${styles.button} ${styles.cancelButton}`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddSelectedUsers}
                            disabled={isCreatingNew ? !newUserData.name : selectedUsers.length === 0}
                            className={`${styles.button} ${styles.submitButton}`}
                        >
                            Add
                        </button>
                    </div>
                </Modal>
            )}

            {isEditingRole && (
                <Modal title="Edit Role" onClose={() => setIsEditingRole(false)}>
                    <div>
                        <p className={styles.label}>Select the new role for this user:</p>
                        <div className={styles.formGroup}>
                            <button
                                onClick={() => handleUpdateRole('USER')}
                                className={`${styles.userItem} ${styles.userItemSelected}`}
                            >
                                User
                            </button>
                            <button
                                onClick={() => handleUpdateRole('ADMIN')}
                                className={styles.userItem}
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <div>
                {users.map((user) => (
                    <div key={user.id} className={styles.userCard}>
                        <div className={styles.userInfo}>
                            <div className={styles.avatar}>
                                {user.name.charAt(0)}
                            </div>
                            <div className={styles.userDetails}>
                                <p className={styles.userName}>{user.name}</p>
                                <p className={styles.userRole}>{user.role}</p>
                            </div>
                        </div>

                        <div className={styles.actionButtons}>
                            <button
                                onClick={() => handleEditRole(user.id)}
                                className={styles.editButton}
                            >
                                <PencilLine size={18} />
                            </button>
                            <button
                                onClick={() => handleRemoveUser(user.id)}
                                className={styles.removeButton}
                            >
                                <Trash2 size={16} />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupUsersList;