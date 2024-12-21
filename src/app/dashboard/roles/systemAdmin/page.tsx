"use client";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsisVertical,
    faFilter,
    faSync,
    faTableCells,
    faChevronUp,
    faChevronDown,
    faEdit,
    faTrash,
    faSearch,
    faTh,
    faPlay,
    faUserShield,
    faCheck,
    faTimes,
    faUpload,

} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import styles from "./page.module.css";
import Image from "next/image"; // Make sure you import the Image component
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";


interface Department {
    id: string;
    name: string;
    avatarUrl: string;
    owner: string;
    lastModified: string;
    modifiedBy: string;
    status: "Active" | "Inactive";
}

const SystemAdmin = () => {
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
    });

    useEffect(() => {
        const initialData: Department[] = [
            {
                id: "1",
                name: "SVS Convent School",
                owner: "Admin user",
                lastModified: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
                modifiedBy: "Admin user",
                status: "Active",
                avatarUrl: "/slide1.jpg",
            },
            {
                id: "2",
                name: "SVS Convent School",
                owner: "Admin user",
                lastModified: "2024-08-30T19:30:00",
                modifiedBy: "Admin user",
                status: "Inactive",
                avatarUrl: "/slide2.jpg",
            },
            {
                id: "3",
                name: "SVS Convent School",
                owner: "Admin user",
                lastModified: "2024-08-30T19:30:00",
                modifiedBy: "Admin user",
                status: "Inactive",
                avatarUrl: "/slide3.jpg",
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
        setFormData({ name: "", owner: "", status: "Active", avatarUrl: "" });
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


    const initialRoleData = {
        id: 1,
        name: "System Admin",
        description:
            "System administrators, also known as sysadmins, are IT professionals who ensure computer systems are functioning and meet organizational needs.",
        services: {
            "Library Services": [
                { name: "Library", permissions: ["get", "list"] },
                { name: "Author", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Publication", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Book", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Book Issue", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Penalty", permissions: ["create", "update", "delete", "get", "list"] },
                { name: "Library Policy", permissions: ["create", "update", "delete", "get", "list"] },
            ],
            "Academic Services": [],
            "Examination Services": [],
        },
    };



    const [openMenu, setOpenMenu] = useState(null);

    const [isClient, setIsClient] = useState(false); // To check if we are on the client side



    // Set the client-side state
    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleMenu = (id) => {
        setOpenMenu(openMenu === id ? null : id);
    };



    const [expandedSections, setExpandedSections] = useState({});
    const [editable, setEditable] = useState({});
    const [services, setServices] = useState(initialRoleData.services);
    const [activeTab, setActiveTab] = useState("Policy");

    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const toggleEditable = (section, index) => {
        setEditable((prevState) => ({
            ...prevState,
            [`${section}-${index}`]: !prevState[`${section}-${index}`],
        }));
    };

    const handleInputChange = (section, index, field, value) => {
        const updatedServices = { ...services };
        updatedServices[section][index][field] = value;
        setServices(updatedServices);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.container}>
            <Breadcrumb />
            <div className={styles.topWrapper}>
                <div className={styles.top}>
                    <div className={styles.menu}>
                        <h1 className={styles.title}>{initialRoleData.name}</h1>
                        <FontAwesomeIcon icon={faEllipsisVertical} className={styles.icon} />
                    </div>
                    <p className={styles.desc}>{initialRoleData.description}</p>
                </div>

                <div className={styles.info}>
                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faUserShield} />
                        <span className={styles.title}>Admin User</span>
                    </div>

                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
                        <span className={styles.title}>30, Aug 7:30 PM</span>
                    </div>


                    <div>
                        <FontAwesomeIcon className={styles.icon} icon={faEdit} />
                        <span className={styles.title}>Shweta</span>

                    </div>

                </div>
            </div>

            <div className={styles.header}>
                <div className={styles.tabs}>
                    <button
                        onClick={() => handleTabClick("Policy")}
                        className={`${styles.tabButton} ${activeTab === "Policy" ? styles.activeTab : ""}`}
                    >
                        Policy
                    </button>
                    <button
                        onClick={() => handleTabClick("Users")}
                        className={`${styles.tabButton} ${activeTab === "Users" ? styles.activeTab : ""}`}
                    >
                        Users
                    </button>
                </div>

            </div>

            <div className={styles.content}>
                {activeTab === "Policy" && (

                    <div className={styles.policysection}>
                        <div className={styles.editIcon}>
                            <FontAwesomeIcon className={styles.editicon} icon={faEdit} />
                        </div>
                        <div className={styles.policyContent}>

                            <div>
                                {Object.keys(services).map((section) => (
                                    <div key={section}>
                                        <div
                                            className={styles.sectionHeader}
                                            onClick={() => toggleSection(section)}
                                        >
                                            <h3>{section}</h3>
                                            <FontAwesomeIcon
                                                icon={expandedSections[section] ? faChevronUp : faChevronDown}
                                                className={styles.icon}
                                            />
                                        </div>
                                        {expandedSections[section] && (
                                            <table className={styles.table}>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Create</th>
                                                        <th>Update</th>
                                                        <th>Delete</th>
                                                        <th>Get</th>
                                                        <th>List</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {services[section].map((service, index) => (
                                                        <tr key={index}>
                                                            <td>{service.name}</td>
                                                            {["create", "update", "delete", "get", "list"].map((perm) => (
                                                                <td key={perm}>
                                                                    <span
                                                                        className={`${styles.permissionIcon} ${service.permissions.includes(perm)
                                                                            ? styles.greenCircle
                                                                            : styles.redCircle
                                                                            }`}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                service.permissions.includes(perm)
                                                                                    ? faCheck
                                                                                    : faTimes
                                                                            }
                                                                        />
                                                                    </span>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {/* Render "Users" tab only on client side */}
                {isClient && activeTab === "Users" && (
                    <div className={styles.container}>
                        <div >

                            <div className={styles.controls}>
                                <div className={styles.searchBar}>
                                    <FontAwesomeIcon icon={faSearch} className={styles.icon} />
                                    <input
                                        type="text"
                                        placeholder="Search "
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={styles.searchInput}
                                    />
                                </div>
                                <button onClick={() => setIsModalOpen(true)} className={styles.createButton}>
                                    + <span className={styles.createtext}>Add</span>
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
                                                    <span>{dept.name}</span>
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
                                        <h2 className={styles.modaltitle}>Create User</h2>
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
                )}
            </div>
        </div>
    );
};

export default SystemAdmin;
