// 'use client'
// import React, { useState, useCallback } from 'react';
// import {
//   ChevronFirst,
//   ChevronLast,
//   ChevronLeft,
//   ChevronRight,
//   Grid,
//   List,
//   Search,
//   ChevronDown,
//   ChevronUp,
//   X
// } from 'lucide-react';
// import '../services/page.css';
// import Link from 'next/link';

// const ServicesDashboard = () => {
//   const [services, setServices] = useState([
//     {
//       id: 1,
//       name: 'Library Service',
//       owner: 'Owner 1',
//       lastModified: '11/21/2024, 10:45:51 PM',
//       modifiedBy: 'User 1',
//       status: 'Active',
//       image: '/api/placeholder/400/320',
//       url: '/library/dashboard'
//     },
//     {
//       id: 2,
//       name: 'Examination Service',
//       owner: 'Owner 2',
//       lastModified: '11/24/2024, 9:47:48 PM',
//       modifiedBy: 'User 2',
//       status: 'Active',
//       image: '/api/placeholder/400/320',
//       url: '/'
//     },
//     {
//       id: 3,
//       name: 'Transport Service',
//       owner: 'Owner 3',
//       lastModified: '12/2/2024, 10:59:37 PM',
//       modifiedBy: 'User 3',
//       status: 'Inactive',
//       image: '/api/placeholder/400/320',
//       url: '/'
//     }
//   ]);

//   // State for view and search
//   const [view, setView] = useState('list');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   // State for modal and form
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingService, setEditingService] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     owner: '',
//     status: 'Active'
//   });

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       owner: '',
//       status: 'Active'
//     });
//     setEditingService(null);
//   };

//   const handleOpenModal = (service = null) => {
//     if (service) {
//       setEditingService(service);
//       setFormData({
//         name: service.name,
//         owner: service.owner,
//         status: service.status
//       });
//     } else {
//       resetForm();
//     }
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     resetForm();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const timestamp = new Date().toLocaleString();
//     if (editingService) {
//       // Update existing service
//       setServices(prev => prev.map(service => {
//         if (service.id === editingService.id) {
//           return {
//             ...service,
//             ...formData,
//             lastModified: timestamp,
//             modifiedBy: 'Current User'
//           };
//         }
//         return service;
//       }));
//     } else {
//       // Add new service
//       const newService = {
//         id: services.length + 1,
//         ...formData,
//         lastModified: timestamp,
//         modifiedBy: 'Current User',
//         image: '/api/placeholder/400/320'
//       };
//       setServices(prev => [...prev, newService]);
//     }
//     handleCloseModal();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Existing sorting and filtering logic
//   const sortServices = useCallback((key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   }, [sortConfig]);

//   const getSortedServices = useCallback(() => {
//     if (!sortConfig.key) return services;
//     return [...services].sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) {
//         return sortConfig.direction === 'ascending' ? -1 : 1;
//       }
//       if (a[sortConfig.key] > b[sortConfig.key]) {
//         return sortConfig.direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//   }, [services, sortConfig]);

//   const filteredServices = getSortedServices().filter(service =>
//     service.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

//   const handleDelete = (id) => {
//     setServices(prev => prev.filter(service => service.id !== id));
//   };

//   const handleStatusChange = (id) => {
//     setServices(prev => prev.map(service =>
//       service.id === id
//         ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' }
//         : service
//     ));
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <div className="header-controls">
//           <div className="search-container">
//             <Search className="search-icon" size={20} />
//             <input
//               type="text"
//               placeholder="Search"
//               className="search-input"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={() => handleOpenModal()}
//             className="add-button"
//           >
//             Add Service
//           </button>
//         </div>
//         <div className="view-toggles">
//           <button
//             onClick={() => setView('grid')}
//             className={`view-button ${view === 'grid' ? 'active' : ''}`}
//           >
//             <Grid size={20} />
//           </button>
//           <button
//             onClick={() => setView('list')}
//             className={`view-button ${view === 'list' ? 'active' : ''}`}
//           >
//             <List size={20} />
//           </button>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
//               <button className="close-button" onClick={handleCloseModal}>
//                 <X size={20} />
//               </button>
//             </div>
//             <form onSubmit={handleSubmit} className="modal-form">
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="owner">Owner</label>
//                 <input
//                   type="text"
//                   id="owner"
//                   name="owner"
//                   value={formData.owner}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="status">Status</label>
//                 <select
//                   id="status"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="cancel-button" onClick={handleCloseModal}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="submit-button">
//                   {editingService ? 'Update' : 'Create'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {view === 'list' ? (
//         <div className="table-container">
//           <table className="services-table">
//             <thead>
//               <tr>
//                 <th onClick={() => sortServices('name')}>
//                   <div className="th-content">
//                     NAME
//                     {sortConfig.key === 'name' && (
//                       sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
//                     )}
//                   </div>
//                 </th>
//                 <th onClick={() => sortServices('owner')}>
//                   <div className="th-content">
//                     OWNER
//                     {sortConfig.key === 'owner' && (
//                       sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
//                     )}
//                   </div>
//                 </th>
//                 <th>LASTMODIFIED</th>
//                 <th>MODIFIEDBY</th>
//                 <th>STATUS</th>
//                 <th>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((service) => (
//                 <tr key={service.id}>
//                   <td>
//                     <div className="service-info">
//                       <Link href={service.url} className="service-icon">{service.name[0]}</Link>
//                       {service.name}
//                     </div>
//                   </td>
//                   <td>{service.owner}</td>
//                   <td>{service.lastModified}</td>
//                   <td>{service.modifiedBy}</td>
//                   <td>
//                     <span className={`status-badge ${service.status.toLowerCase()}`}>
//                       {service.status}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button
//                         onClick={() => handleOpenModal(service)}
//                         className="edit-button"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(service.id)}
//                         className="delete-button"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="grid-container">
//           {currentItems.map((service) => (
//             <Link href={service.url} key={service.id} className="service-card">
//               <div
//                 className="card-background"
//                 style={{ backgroundImage: `url(${service.image})` }}
//               >
//                 <div className="card-overlay">
//                   <h3 className="card-title">{service.name}</h3>
//                   <div className="card-actions">
//                     <button
//                       onClick={() => handleOpenModal(service)}
//                       className="card-edit-button"
//                     >
//                       Edit
//                     </button>
//                     <div className="toggle-container">
//                       <label className="toggle">
//                         <input
//                           type="checkbox"
//                           checked={service.status === 'Active'}
//                           onChange={() => handleStatusChange(service.id)}
//                         />
//                         <span className="toggle-slider"></span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}

//       <div className="pagination">
//         <div className="pagination-info">
//           <select
//             value={itemsPerPage}
//             onChange={(e) => setItemsPerPage(Number(e.target.value))}
//             className="items-per-page"
//           >
//             <option value={5}>5 per page</option>
//             <option value={10}>10 per page</option>
//             <option value={20}>20 per page</option>
//           </select>
//           <span className="entry-count">
//             Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredServices.length)} of {filteredServices.length} entries
//           </span>
//         </div>
//         <div className="pagination-controls">
//           <button
//             onClick={() => setCurrentPage(1)}
//             disabled={currentPage === 1}
//             className="page-button"
//           >
//             <ChevronFirst size={20} />
//           </button>
//           <button
//             onClick={() => setCurrentPage(prev => prev - 1)}
//             disabled={currentPage === 1}
//             className="page-button"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button className="current-page">
//             {currentPage}
//           </button>
//           <button
//             onClick={() => setCurrentPage(prev => prev + 1)}
//             disabled={currentPage === totalPages}
//             className="page-button"
//           >
//             <ChevronRight size={20} />
//           </button>
//           <button
//             onClick={() => setCurrentPage(totalPages)}
//             disabled={currentPage === totalPages}
//             className="page-button"
//           >
//             <ChevronLast size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServicesDashboard;

'use client'
import React, { useState, useCallback, useMemo } from 'react';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Search,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import Link from 'next/link';
import './page.css';

const ServicesDashboard = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Library Service',
      owner: 'Owner 1',
      lastModified: '11/21/2024, 10:45:51 PM',
      modifiedBy: 'User 1',
      status: 'Active',
      image: '/api/placeholder/400/320',
      url: '/library-dashboard'
    },
    {
      id: 2,
      name: 'Examination Service',
      owner: 'Owner 2',
      lastModified: '11/24/2024, 9:47:48 PM',
      modifiedBy: 'User 2',
      status: 'Active',
      image: '/api/placeholder/400/320',
      url: '/'
    },
    {
      id: 3,
      name: 'Transport Service',
      owner: 'Owner 3',
      lastModified: '12/2/2024, 10:59:37 PM',
      modifiedBy: 'User 3',
      status: 'Inactive',
      image: '/api/placeholder/400/320',
      url: '/'
    }
  ]);

  const [view, setView] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    status: 'Active'
  });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      owner: '',
      status: 'Active'
    });
    setEditingService(null);
  }, []);

  const handleOpenModal = useCallback((service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        owner: service.owner,
        status: service.status
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  }, [resetForm]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();

    if (editingService) {
      setServices(prev => prev.map(service =>
        service.id === editingService.id
          ? {
            ...service,
            ...formData,
            lastModified: timestamp,
            modifiedBy: 'Current User'
          }
          : service
      ));
    } else {
      const newId = Math.max(...services.map(s => s.id), 0) + 1;
      const newService = {
        id: newId,
        ...formData,
        lastModified: timestamp,
        modifiedBy: 'Current User',
        image: '/api/placeholder/400/320',
        url: '/'
      };
      setServices(prev => [...prev, newService]);
    }
    handleCloseModal();
  }, [editingService, formData, handleCloseModal, services]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const sortServices = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending'
    }));
  }, []);

  const getSortedServices = useMemo(() => {
    if (!sortConfig.key) return services;

    return [...services].sort((a, b) => {
      const aValue = String(a[sortConfig.key]).toLowerCase();
      const bValue = String(b[sortConfig.key]).toLowerCase();

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [services, sortConfig]);

  const filteredServices = useMemo(() =>
    getSortedServices.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [getSortedServices, searchQuery]
  );

  const handleDelete = useCallback((e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  }, []);

  const handleStatusChange = useCallback((e, id) => {
    e.preventDefault();
    e.stopPropagation();

    setServices(prev => prev.map(service =>
      service.id === id
        ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' }
        : service
    ));
  }, []);

  const { currentItems, totalPages } = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    return {
      currentItems: filteredServices.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.ceil(filteredServices.length / itemsPerPage)
    };
  }, [currentPage, itemsPerPage, filteredServices]);

  const paginationInfo = useMemo(() => {
    const start = ((currentPage - 1) * itemsPerPage) + 1;
    const end = Math.min(currentPage * itemsPerPage, filteredServices.length);
    return { start, end, total: filteredServices.length };
  }, [currentPage, itemsPerPage, filteredServices.length]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-controls">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search services..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="add-button"
          >
            Add Service
          </button>
        </div>
        <div className="view-toggles">
          <button
            onClick={() => setView('grid')}
            className={`view-button ${view === 'grid' ? 'active' : ''}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setView('list')}
            className={`view-button ${view === 'list' ? 'active' : ''}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={handleCloseModal} className="close-button">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="owner">Owner</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {view === 'list' ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => sortServices('name')}>
                  <div className="th-content">
                    NAME
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th onClick={() => sortServices('owner')}>
                  <div className="th-content">
                    OWNER
                    {sortConfig.key === 'owner' && (
                      sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th>LAST MODIFIED</th>
                <th>MODIFIED BY</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((service) => (
                <tr key={service.id}>
                  <td>
                    <Link href={service.url} className="service-link">
                      <div className="service-icon">{service.name[0]}</div>
                      <span>{service.name}</span>
                    </Link>
                  </td>
                  <td>{service.owner}</td>
                  <td>{service.lastModified}</td>
                  <td>{service.modifiedBy}</td>
                  <td>
                    <span className={`status-badge ${service.status.toLowerCase()}`}>
                      {service.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenModal(service);
                        }}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, service.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid-container">
          {currentItems.map((service) => (
            <Link href={service.url} key={service.id} className="grid-card">
              <div className="card-image">
                <img src={service.image} alt={service.name} />
                <div className="card-overlay">
                  <h3>{service.name}</h3>
                  <div className="card-actions">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenModal(service);
                      }}
                      className="card-edit-button"
                    >
                      Edit
                    </button>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={service.status === 'Active'}
                        onChange={(e) => handleStatusChange(e, service.id)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="pagination">
        <div className="pagination-info">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="items-per-page"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
          <span className="entry-count">
            Showing {paginationInfo.start} to {paginationInfo.end} of {paginationInfo.total} entries
          </span>
        </div>
        <div className="pagination-controls">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            <ChevronFirst size={20} />
          </button>
          <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="current-page">{currentPage}</span>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            <ChevronLast size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesDashboard;