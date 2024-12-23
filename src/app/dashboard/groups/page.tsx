"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faSync, faTh, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { Divide } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Department {
  id: string;
  name: string;
  avatarUrl: string;
  owner: string;
  lastModified: string;
  modifiedBy: string;
  status: "Active" | "Inactive";
  url: string;
}

const Groups = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Department>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    status: "Active" as "Active" | "Inactive",
    avatarUrl: "",
    url: "",
  });

  useEffect(() => {
    const initialData: Department[] = [
      {
        id: "1",
        name: "Devmode Groups",
        owner: "Admin user",
        lastModified: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        modifiedBy: "Admin user",
        status: "Active",
        avatarUrl: "/slide1.jpg",
        url: "/dashboard/groups/devmodeGroups",
      },
      {
        id: "2",
        name: "Devmode Groups",
        owner: "Admin user",
        lastModified: "2024-08-30T19:30:00",
        modifiedBy: "Admin user",
        status: "Inactive",
        avatarUrl: "/slide2.jpg",
        url: "/dashboard/groups/devmodeGroups",
      },
      {
        id: "3",
        name: "Devmode Groups",
        owner: "Admin user",
        lastModified: "2024-08-30T19:30:00",
        modifiedBy: "Admin user",
        status: "Inactive",
        avatarUrl: "/slide3.jpg",
        url: "/dashboard/groups/devmodeGroups",
      },
    ];
    setDepartments(initialData);
  }, []);

  // Navigate to a department detail page
  const handleDepartmentClick = (id: string) => {
    router.push(`/department/${id}`);
  };

  const handleSort = (field: keyof Department) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const newDepartment: Department = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      lastModified: new Date().toISOString(),
      modifiedBy: formData.owner,
    };
    setDepartments((prev) => [...prev, newDepartment]);
    setFormData({ name: "", url: "", owner: "", status: "Active", avatarUrl: "" });
    setIsModalOpen(false);
  };

  const handleUpdateStatus = (id: string, status: "Active" | "Inactive") => {
    setDepartments((prev) =>
      prev.map((dept) => (dept.id === id ? { ...dept, status } : dept))
    );
  };

  const handleDelete = (id: string) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id));
  };

  const filteredDepartments = departments
    .filter(
      (dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.owner.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const compareResult =
        typeof aValue === "string" && typeof bValue === "string"
          ? aValue.localeCompare(bValue)
          : aValue < bValue
            ? -1
            : 1;
      return sortDirection === "asc" ? compareResult : -compareResult;
    });

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

  const totalItems = filteredDepartments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Groups</h1>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className={styles.createButton}>
            + <span className={styles.createtext}>Create Groups</span>
          </button>
        </div>
      </div>

      <div className={styles.tablecontainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {['name', 'owner', 'lastModified', 'modifiedBy', 'status'].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field as keyof Department)}
                  className={styles.sortableHeader}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sortField === field && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDepartments.map((dept) => (
              <tr key={dept.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Image
                      className={styles.avatar}
                      src={dept.avatarUrl}
                      alt={`${dept.name} Avatar`}
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                    />
                    <Link href={dept.url}>{dept.name}</Link>
                  </div>
                </td>
                <td>{dept.owner}</td>
                <td>
                  {new Date(dept.lastModified).toLocaleString()}
                </td>
                <td>{dept.modifiedBy}</td>
                <td>
                  <select
                    value={dept.status}
                    onChange={(e) =>
                      handleUpdateStatus(dept.id, e.target.value as "Active" | "Inactive")
                    }
                    className={`${styles.statusSelect} ${dept.status === "Active" ? styles.statusactive : styles.statusinactive
                      }`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className={styles.tablecell}>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className={styles.deletebutton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationinfo}>
          Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)} to{' '}
          {Math.min(totalItems, currentPage * itemsPerPage)} of {totalItems} entries
        </div>

        <div className={styles.paginationcontrols}>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={styles.paginationbutton}
          >
            ⟪
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={styles.paginationbutton}
          >
            ←
          </button>

          {getPageNumbers().map((pageNum, index) => (
            <button
              key={index}
              onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
              className={`paginationbutton ${pageNum === currentPage ? 'active' : ''
                } ${typeof pageNum !== 'number' ? 'ellipsis' : ''}`}
              disabled={typeof pageNum !== 'number'}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={styles.paginationbutton}
          >
            →
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className={styles.paginationbutton}
          >
            ⟫
          </button>
        </div>

        <div className={styles.itemsPerPage}>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className={styles.itemsPerPageSelect}
          >
            {[5, 10, 25, 50].map((value) => (
              <option key={value} value={value}>
                {value} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modaloverlay}>
          <div className={styles.modal}>
            <div className={styles.modalheader}>
              <h2 className={styles.modaltitle}>Create Group</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className={styles.closebutton}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDepartment}>
              <div className={styles.formgroup}>
                <label className={styles.formlabel}>Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={styles.forminput}
                />
              </div>


              <div className={styles.formgroup}>
                <label className={styles.formlabel}>Avatar</label>
                <div className={styles.uploadcontainer}>
                  <label htmlFor="avatar-upload" className={styles.uploadbutton}>
                    <FontAwesomeIcon icon={faUpload} className={styles.uploadicon} />

                    Upload Avatar
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (uploadEvent) => {
                          setFormData({ ...formData, avatarUrl: uploadEvent.target?.result as string });
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                    className={styles.formupload}
                  />
                </div>
              </div>



              <div className={styles.formgroup}>
                <label className={styles.formlabel}>Owner</label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) =>
                    setFormData({ ...formData, owner: e.target.value })
                  }
                  className={styles.forminput}
                />
              </div>

              <div className={styles.formgroup}>
                <label className={styles.formlabel}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as 'Active' | 'Inactive',
                    })
                  }
                  className={styles.forminput}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className={styles.formactions}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.buttonsecondary}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.buttonprimary}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
