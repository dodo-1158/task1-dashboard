'use client'
import React, { useState, useEffect } from 'react';
import '../department/page.css';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

interface Department {
  id: string;
  name: string;
  description: string;
  users: string[];
  owner: string;
  lastModified: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

const DepartmentDashboard = () => {
  const router = useRouter(); // Initialize useRouter for navigation
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Department>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    description: '', // Add description field
    owner: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  // Simulate initial data with departments
  useEffect(() => {
    const initialData: Department[] = [
      {
        id: '1',
        name: 'IT',
        description: 'Information Technology Department',
        users: ['Shikha Sharma'],
        owner: 'Owner 1',
        lastModified: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        modifiedBy: 'User 1',
        status: 'Active'
      },
      {
        id: '2',
        name: 'HR',
        description: 'Human Resources Department',
        users: ['User 2'],
        owner: 'Owner 2',
        lastModified: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        modifiedBy: 'User 2',
        status: 'Active'
      },
      {
        id: '3',
        name: 'Marketing',
        description: 'Marketing Department',
        users: ['User 3'],
        owner: 'Owner 3',
        lastModified: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        modifiedBy: 'User 3',
        status: 'Inactive'
      },
    ];
    setDepartments(initialData);
  }, []);

  // Navigate to a department detail page
  const handleDepartmentClick = (id: string) => {
    router.push(`/dashboard/department/${id}`);
  };

  // Handle sorting logic
  const handleSort = (field: keyof Department) => {
    setSortField(field);
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Handle department creation
  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const newDepartment: Department = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      lastModified: new Date().toISOString(),
      modifiedBy: formData.owner,
      users: [] // Initialize with an empty users array
    };
    setDepartments(prev => [...prev, newDepartment]);
    setFormData({ name: '', description: '', owner: '', status: 'Active' });
    setIsModalOpen(false);
  };

  // Handle status update
  const handleUpdateStatus = (id: string, status: 'Active' | 'Inactive') => {
    setDepartments(prev =>
      prev.map(dept => dept.id === id ? { ...dept, status } : dept)
    );
  };

  // Handle department deletion
  const handleDelete = (id: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  // Filter and sort departments based on search term and sort direction
  const filteredDepartments = departments
    .filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.owner.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const compareResult =
        typeof aValue === 'string' && typeof bValue === 'string'
          ? aValue.localeCompare(bValue)
          : aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });

  // Pagination logic
  const totalItems = filteredDepartments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="main-content">
      <div className="header">
        <h1 className="page-title">Department</h1>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            className="create-button"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Department
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="department-table">
          <thead className="table-header">
            <tr>
              {['name', 'owner', 'lastModified', 'modifiedBy', 'status'].map((field) => (
                <th key={field} onClick={() => handleSort(field as keyof Department)} className="sortable-header">
                  {field.charAt(0).toUpperCase() + field.slice(1)} 
                  {sortField === field && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDepartments.map((dept) => (
              <tr key={dept.id} className="table-row">
                <td className="table-cell">
                  <div className="department-info">
                    <div className="department-icon"></div>
                    <span className="department-name" onClick={()=>handleDepartmentClick(dept.id)}>{dept.name}</span>
                  </div>
                </td>
                <td className="table-cell">{dept.owner}</td>
                <td className="table-cell">
                  {new Date(dept.lastModified).toLocaleString()}
                </td>
                <td className="table-cell">{dept.modifiedBy}</td>
                <td className="table-cell">
                  <select
                    value={dept.status}
                    onChange={(e) => handleUpdateStatus(dept.id, e.target.value as 'Active' | 'Inactive')}
                    className={`status-select ${dept.status === 'Active' ? 'status-active' : 'status-inactive'}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} to{' '}
          {Math.min(totalItems, currentPage * itemsPerPage)} of {totalItems} entries
        </div>

        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            ⟪
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            ←
          </button>

          {getPageNumbers().map((pageNum, index) => (
            <button
              key={index}
              onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
              className={`pagination-button ${pageNum === currentPage ? 'active' : ''} ${typeof pageNum !== 'number' ? 'ellipsis' : ''}`}
              disabled={typeof pageNum !== 'number'}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            →
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            ⟫
          </button>
        </div>

        <div className="items-per-page">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="items-per-page-select"
          >
            {[5, 10, 25, 50].map(value => (
              <option key={value} value={value}>
                {value} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Create Department</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="close-button"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDepartment}>
              <div className="form-group">
                <label className="form-label">Department Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Owner</label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                  className="form-input"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="button button-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button button-primary"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default DepartmentDashboard;
