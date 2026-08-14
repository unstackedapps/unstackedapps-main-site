import { motion } from "framer-motion";
import {
  ArrowUpDown,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Filter,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Save,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MarketingPageHeader,
  marketingCardClass,
} from "@/components/MarketingPageHeader";
import { Seo } from "@/components/Seo";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SPAType = "user-management" | "professional-resume";

interface User {
  address?: string;
  department?: string;
  email: string;
  id: number;
  lastModified: string;
  name: string;
  notes?: string;
  phone?: string;
  role: string;
  startDate?: string;
  status: string;
  supervisor?: string;
  termDate?: string;
}

// Helper function to format datetime as "MMM D, YYYY h:mm A"
function formatDateTime(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${month} ${day}, ${year} ${hours}:${minutesStr} ${ampm}`;
}

// Helper function to get current datetime formatted
function getCurrentDateTime(): string {
  return formatDateTime(new Date());
}

export function SPAShowcase() {
  const [selectedSPA, setSelectedSPA] = useState<SPAType>("user-management");

  return (
    <>
      <Seo
        description="Interactive SPA examples from Unstacked Apps — user management and professional resume demos built with React."
        path="/spa-showcase"
        title="SPA Showcase"
      />
      <SiteHeader backTo={{ href: "/", label: "Back to Home" }} />

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <MarketingPageHeader
          description="Interactive examples of single-page applications"
          eyebrow="Examples"
          title="SPA Examples"
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-6 sm:pb-8 md:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4">
          <Tabs
            className="w-full sm:w-auto"
            onValueChange={(value) => setSelectedSPA(value as SPAType)}
            value={selectedSPA}
          >
            <TabsList className="grid w-full grid-cols-2 sm:inline-flex sm:w-auto">
              <TabsTrigger className="gap-2" value="user-management">
                <Users className="h-4 w-4" />
                <span className="sm:hidden">User Management</span>
                <span className="hidden sm:inline">User Management (UMS)</span>
              </TabsTrigger>
              <TabsTrigger className="gap-2" value="professional-resume">
                <FileText className="h-4 w-4" />
                <span className="sm:hidden">Résumé</span>
                <span className="hidden sm:inline">Professional Résumé</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center text-[#f3efe6]/65 text-sm sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            key={selectedSPA}
            transition={{ duration: 0.5 }}
          >
            {selectedSPA === "user-management"
              ? "Manage users with inline editing, search, and export capabilities"
              : "Responsive résumé layout optimized for all screen sizes"}
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          {selectedSPA === "user-management" && <UserManagementSPA />}
          {selectedSPA === "professional-resume" && (
            <div className="relative">
              <Link
                className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-md border border-white/15 bg-[#141c27]/90 px-3 py-2 text-[#f3efe6] text-sm transition-colors hover:bg-white/10"
                to="/resume-demo"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">View Full Example</span>
                <span className="sm:hidden">Full</span>
              </Link>
              <ProfessionalResumeSPA />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Generate 50 sample users - defined outside component to avoid calling Math.random during render
function generateDefaultUsers(): User[] {
  const firstNames = [
    "Sarah",
    "Michael",
    "Emily",
    "David",
    "Jessica",
    "James",
    "Maria",
    "Robert",
    "Lisa",
    "William",
    "Jennifer",
    "Richard",
    "Patricia",
    "Joseph",
    "Linda",
    "Thomas",
    "Barbara",
    "Charles",
    "Elizabeth",
    "Christopher",
    "Susan",
    "Daniel",
    "Karen",
    "Matthew",
    "Nancy",
    "Anthony",
    "Betty",
    "Mark",
    "Helen",
    "Donald",
    "Sandra",
    "Steven",
    "Donna",
    "Paul",
    "Carol",
    "Andrew",
    "Ruth",
    "Joshua",
    "Sharon",
    "Kenneth",
    "Michelle",
    "Kevin",
    "Laura",
    "Brian",
    "Sarah",
    "George",
    "Kimberly",
    "Edward",
    "Deborah",
    "Ronald",
  ];
  const lastNames = [
    "Johnson",
    "Chen",
    "Rodriguez",
    "Kim",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
    "Green",
    "Adams",
    "Nelson",
    "Baker",
    "Hall",
    "Rivera",
    "Campbell",
    "Mitchell",
    "Carter",
    "Roberts",
    "Gomez",
  ];
  const roles = ["Admin", "Editor", "Viewer"];
  const statuses = ["Active", "Inactive"];

  const departments = [
    "Engineering",
    "Sales",
    "Marketing",
    "HR",
    "Finance",
    "Operations",
    "Support",
    "Product",
  ];
  const supervisors = [
    "John Smith",
    "Jane Doe",
    "Mike Johnson",
    "Sarah Williams",
    "David Brown",
    "Lisa Anderson",
  ];
  const addresses = [
    "123 Main St, San Francisco, CA",
    "456 Oak Ave, New York, NY",
    "789 Pine Rd, Austin, TX",
    "321 Elm St, Seattle, WA",
    "654 Maple Dr, Boston, MA",
  ];

  const users: User[] = [];
  const now = new Date();
  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const role = roles[Math.floor(Math.random() * roles.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    // Generate random datetime in the past (up to 30 days ago)
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    const randomDate = new Date(
      now.getTime() -
        daysAgo * 24 * 60 * 60 * 1000 -
        hoursAgo * 60 * 60 * 1000 -
        minutesAgo * 60 * 1000
    );
    const lastModified = formatDateTime(randomDate);

    // Generate additional profile data - format as YYYY-MM-DD using local timezone
    const formatDateLocal = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const startDate = formatDateLocal(
      new Date(
        2020 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      )
    );
    const termDate =
      status === "Inactive" && Math.random() > 0.5
        ? formatDateLocal(
            new Date(
              2023 + Math.floor(Math.random() * 2),
              Math.floor(Math.random() * 12),
              Math.floor(Math.random() * 28) + 1
            )
          )
        : undefined;
    const phone = `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const supervisor =
      supervisors[Math.floor(Math.random() * supervisors.length)];
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    const notes =
      Math.random() > 0.7
        ? "Key team member with excellent performance."
        : undefined;

    users.push({
      address,
      department,
      email,
      id: i,
      lastModified,
      name,
      notes,
      phone,
      role,
      startDate,
      status,
      supervisor,
      termDate,
    });
  }
  return users;
}

const DEFAULT_USERS = generateDefaultUsers();

function UserManagementSPA() {
  const STORAGE_KEY = "ums_users";

  // Load users from sessionStorage or use defaults
  const loadUsers = (): User[] => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load users from sessionStorage", e);
    }
    return DEFAULT_USERS;
  };

  const [users, setUsers] = useState<User[]>(loadUsers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [profileEditData, setProfileEditData] = useState<Partial<User>>({});
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof User | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const itemsPerPage = 25;

  // Helper function to get default column visibility
  const getDefaultColumnVisibility = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    return {
      email: !isMobile, // Visible on desktop, hidden on mobile
      lastModified: !isMobile, // Visible on desktop, hidden on mobile
      name: true, // Always visible
      role: false, // Hidden by default on both mobile and desktop
      status: true, // Always visible
      // Actions is always visible, not in this object
    };
  };

  // Column visibility state - defaults based on screen size
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    getDefaultColumnVisibility
  );

  // Column widths state - default to auto (fit content)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  // Resizing state
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);

  // Wrapper function to handle column visibility changes
  // When columns are hidden, clear their widths so remaining columns can auto-resize
  const handleColumnVisibilityChange = (column: string, checked: boolean) => {
    const newVisibility = { ...visibleColumns, [column]: checked };
    setVisibleColumns(newVisibility);

    // If hiding a column, remove its width so remaining columns can auto-resize
    if (!checked && columnWidths[column]) {
      const newWidths = { ...columnWidths };
      delete newWidths[column];
      setColumnWidths(newWidths);
    }
  };
  const [nextId, setNextId] = useState(() => {
    const maxId = Math.max(...users.map((u) => u.id), 0);
    return maxId + 1;
  });

  // Save to sessionStorage whenever users change
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // Ref for the scrollable table container
  const tableScrollRef = useRef<HTMLDivElement>(null);

  // Ensure table scrolls to top on mount
  useEffect(() => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollTop = 0;
    }
  }, []);

  const handleAddUser = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const defaultStartDate = `${year}-${month}-${day}`;

    setProfileEditData({
      address: "",
      department: "",
      email: "",
      name: "",
      notes: "",
      phone: "",
      role: "Viewer",
      startDate: defaultStartDate,
      status: "Active",
      supervisor: "",
      termDate: undefined,
    });
    setIsAddingUser(true);
    setSelectedUserId(null);
    setProfileModalOpen(true);
  };

  const handleRowClick = (user: User) => {
    setSelectedUserId(user.id);
    setProfileEditData({ ...user });
    setIsAddingUser(false);
    setProfileModalOpen(true);
  };

  const handleProfileSave = () => {
    if (isAddingUser) {
      // Create new user
      const newUser: User = {
        address: profileEditData.address || "",
        department: profileEditData.department || "",
        email: profileEditData.email || "",
        id: nextId,
        lastModified: getCurrentDateTime(),
        name: profileEditData.name || "",
        notes: profileEditData.notes || "",
        phone: profileEditData.phone || "",
        role: profileEditData.role || "Viewer",
        startDate: profileEditData.startDate,
        status: profileEditData.status || "Active",
        supervisor: profileEditData.supervisor || "",
        termDate: profileEditData.termDate,
      };
      setUsers([newUser, ...users]);
      setNextId(nextId + 1);
      setCurrentPage(1); // Reset to first page to show the new user
    } else if (selectedUserId !== null) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === selectedUserId
            ? {
                ...user,
                ...profileEditData,
                lastModified: getCurrentDateTime(),
              }
            : user
        )
      );
    }
    setProfileModalOpen(false);
    setSelectedUserId(null);
    setProfileEditData({});
    setIsAddingUser(false);
  };

  const handleProfileCancel = () => {
    setProfileModalOpen(false);
    setSelectedUserId(null);
    setProfileEditData({});
    setIsAddingUser(false);
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditData({ ...user });
    setIsNewUser(false);
  };

  const handleSave = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, ...editData, lastModified: getCurrentDateTime() }
          : user
      )
    );
    setEditingId(null);
    setEditData({});
    setIsNewUser(false);
  };

  const handleCancel = () => {
    if (isNewUser && editingId !== null) {
      // Remove the newly added user if canceling
      setUsers(users.filter((user) => user.id !== editingId));
    }
    setEditingId(null);
    setEditData({});
    setIsNewUser(false);
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete !== null) {
      setUsers(users.filter((user) => user.id !== userToDelete));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleResetDemo = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setUsers(DEFAULT_USERS);
    setCurrentPage(1);
    handleSearchChange("");
    handleRoleFilterChange("");
    handleStatusFilterChange("");
    setSortField("");
    setSortDirection("asc");
    setNextId(51);
    // Reset column visibility to defaults
    setVisibleColumns(getDefaultColumnVisibility());
    // Reset column widths to auto (empty object)
    setColumnWidths({});
  };

  // Column resize handlers
  const handleResizeStart = (column: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the actual column width from the DOM
    const th = (e.currentTarget as HTMLElement).closest("th");
    const currentWidth = th ? th.offsetWidth : columnWidths[column] || 0;

    setResizingColumn(column);
    setResizeStartX(e.clientX);
    setResizeStartWidth(currentWidth);
  };

  // Prevent text selection while resizing
  useEffect(() => {
    if (resizingColumn) {
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [resizingColumn]);

  useEffect(() => {
    if (!resizingColumn) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - resizeStartX;
      const newWidth = Math.max(50, resizeStartWidth + diff); // Minimum width of 50px
      setColumnWidths((prev) => ({ ...prev, [resizingColumn]: newWidth }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizingColumn, resizeStartX, resizeStartWidth]);

  const handleSort = (field: keyof User) => {
    setCurrentPage(1);
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleExport = (format: "json" | "csv") => {
    const filteredUsers = getFilteredAndSortedUsers();

    if (format === "json") {
      const dataStr = JSON.stringify(filteredUsers, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "users.json";
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === "csv") {
      const headers = [
        "ID",
        "Name",
        "Email",
        "Role",
        "Status",
        "Last Modified",
      ];
      const rows = filteredUsers.map((user) => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastModified,
      ]);
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      const dataBlob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "users.csv";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const getFilteredAndSortedUsers = (): User[] => {
    let filtered = users.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "" || user.role === roleFilter;
      const matchesStatus = statusFilter === "" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Apply sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        // Special handling for lastModified - parse dates for proper sorting
        if (sortField === "lastModified") {
          const aDate = new Date(a.lastModified);
          const bDate = new Date(b.lastModified);
          if (Number.isNaN(aDate.getTime()) || Number.isNaN(bDate.getTime())) {
            // Fallback to string comparison if dates are invalid
            const aVal = a.lastModified ?? "";
            const bVal = b.lastModified ?? "";
            if (aVal < bVal) {
              return sortDirection === "asc" ? -1 : 1;
            }
            if (aVal > bVal) {
              return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
          }
          const diff = aDate.getTime() - bDate.getTime();
          return sortDirection === "asc" ? diff : -diff;
        }

        const aVal = a[sortField] ?? "";
        const bVal = b[sortField] ?? "";
        if (aVal < bVal) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const filteredUsers = getFilteredAndSortedUsers();
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const userToDeleteName =
    userToDelete === null
      ? "this user"
      : users.find((u) => u.id === userToDelete)?.name || "this user";

  const selectedUser =
    selectedUserId === null ? null : users.find((u) => u.id === selectedUserId);

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog onOpenChange={setDeleteDialogOpen} open={deleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{userToDeleteName}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Profile Modal */}
      <Dialog
        onOpenChange={(open) => {
          setProfileModalOpen(open);
          if (!open) {
            // Reset state when modal closes
            handleProfileCancel();
          }
        }}
        open={profileModalOpen}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddingUser ? "Add New User" : "User Profile"}
            </DialogTitle>
            <DialogDescription>
              {isAddingUser
                ? "Enter information for the new user"
                : "View and edit user information"}
            </DialogDescription>
          </DialogHeader>
          {(selectedUser || isAddingUser) && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-medium text-sm">Name</label>
                  <input
                    className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        name: e.target.value,
                      })
                    }
                    type="text"
                    value={profileEditData.name || ""}
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-sm">
                    Email
                  </label>
                  <input
                    className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    value={profileEditData.email || ""}
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-sm">
                    Phone
                  </label>
                  <input
                    className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    value={profileEditData.phone || ""}
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-sm">Role</label>
                  <select
                    className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        role: e.target.value,
                      })
                    }
                    value={profileEditData.role || ""}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-medium text-sm">
                    Status
                  </label>
                  <select
                    className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        status: e.target.value,
                      })
                    }
                    value={profileEditData.status || ""}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-medium text-sm">
                    Department
                  </label>
                  <input
                    className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        department: e.target.value,
                      })
                    }
                    placeholder="Engineering"
                    type="text"
                    value={profileEditData.department || ""}
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-sm">
                    Supervisor
                  </label>
                  <input
                    className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        supervisor: e.target.value,
                      })
                    }
                    placeholder="John Smith"
                    type="text"
                    value={profileEditData.supervisor || ""}
                  />
                </div>
                <div>
                  <DatePicker
                    label="Start Date"
                    onChange={(date) =>
                      setProfileEditData({
                        ...profileEditData,
                        startDate: date,
                      })
                    }
                    placeholder="Select start date"
                    value={profileEditData.startDate}
                  />
                </div>
                <div>
                  <DatePicker
                    label="Term Date"
                    onChange={(date) =>
                      setProfileEditData({ ...profileEditData, termDate: date })
                    }
                    placeholder="Select term date"
                    value={profileEditData.termDate}
                  />
                </div>
                {!isAddingUser && (
                  <div>
                    <label className="mb-1 block font-medium text-sm">
                      Last Modified
                    </label>
                    <input
                      className="w-full cursor-not-allowed rounded-md border bg-muted px-3 py-2 text-muted-foreground text-sm"
                      readOnly
                      type="text"
                      value={profileEditData.lastModified || ""}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="mb-1 block font-medium text-sm">
                  Address
                </label>
                <input
                  className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                  onChange={(e) =>
                    setProfileEditData({
                      ...profileEditData,
                      address: e.target.value,
                    })
                  }
                  placeholder="123 Main St, City, State ZIP"
                  type="text"
                  value={profileEditData.address || ""}
                />
              </div>
              <div>
                <label className="mb-1 block font-medium text-sm">Notes</label>
                <textarea
                  className="w-full resize-none rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm"
                  onChange={(e) =>
                    setProfileEditData({
                      ...profileEditData,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Additional notes about this user..."
                  rows={4}
                  value={profileEditData.notes || ""}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleProfileCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleProfileSave}>
              {isAddingUser ? "Add User" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <Card className={marketingCardClass}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Action bar - improved mobile layout */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Button className="gap-2" onClick={handleAddUser} size="sm">
                      <UserPlus className="h-4 w-4" />
                      <span className="hidden sm:inline">Add User</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="gap-2" size="sm" variant="outline">
                          <Columns className="h-4 w-4" />
                          <span className="hidden sm:inline">Columns</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Show Columns</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.name}
                          onCheckedChange={(checked) =>
                            handleColumnVisibilityChange("name", checked)
                          }
                        >
                          Name
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.email}
                          onCheckedChange={(checked) =>
                            handleColumnVisibilityChange("email", checked)
                          }
                        >
                          Email
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.role}
                          onCheckedChange={(checked) =>
                            handleColumnVisibilityChange("role", checked)
                          }
                        >
                          Role
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.status}
                          onCheckedChange={(checked) =>
                            handleColumnVisibilityChange("status", checked)
                          }
                        >
                          Status
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={visibleColumns.lastModified}
                          onCheckedChange={(checked) =>
                            handleColumnVisibilityChange(
                              "lastModified",
                              checked
                            )
                          }
                        >
                          Last Modified
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="gap-2" size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Export</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleExport("json")}>
                          Export as JSON
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport("csv")}>
                          Export as CSV
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      className="gap-2"
                      onClick={handleResetDemo}
                      size="sm"
                      variant="outline"
                    >
                      <X className="h-4 w-4" />
                      <span className="hidden sm:inline">Reset Demo</span>
                    </Button>
                  </div>
                  <input
                    className="w-full rounded-md border bg-card/80 px-3 py-2 text-foreground text-sm placeholder:text-muted-foreground md:w-auto md:min-w-[200px]"
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search users..."
                    type="search"
                    value={searchQuery}
                  />
                </div>

                {/* Filters and Sort */}
                <div className="flex flex-wrap items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="gap-2" size="sm" variant="outline">
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="mb-2 font-semibold text-muted-foreground text-xs">
                          Role
                        </p>
                        <select
                          className="w-full rounded-md border bg-card/80 px-2 py-1.5 text-foreground text-sm"
                          onChange={(e) =>
                            handleRoleFilterChange(e.target.value)
                          }
                          value={roleFilter}
                        >
                          <option value="">All Roles</option>
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                      </div>
                      <div className="px-2 py-1.5">
                        <p className="mb-2 font-semibold text-muted-foreground text-xs">
                          Status
                        </p>
                        <select
                          className="w-full rounded-md border bg-card/80 px-2 py-1.5 text-foreground text-sm"
                          onChange={(e) =>
                            handleStatusFilterChange(e.target.value)
                          }
                          value={statusFilter}
                        >
                          <option value="">All Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      {(roleFilter || statusFilter) && (
                        <div className="border-t px-2 py-1.5">
                          <Button
                            className="w-full"
                            onClick={() => {
                              handleRoleFilterChange("");
                              handleStatusFilterChange("");
                            }}
                            size="sm"
                            variant="ghost"
                          >
                            Clear Filters
                          </Button>
                        </div>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="gap-2" size="sm" variant="outline">
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="hidden sm:inline">Sort</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleSort("name")}>
                        Name{" "}
                        {sortField === "name" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("email")}>
                        Email{" "}
                        {sortField === "email" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("role")}>
                        Role{" "}
                        {sortField === "role" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSort("status")}>
                        Status{" "}
                        {sortField === "status" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSort("lastModified")}
                      >
                        Last Modified{" "}
                        {sortField === "lastModified" &&
                          (sortDirection === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                      {sortField && (
                        <>
                          <div className="my-1 border-t" />
                          <DropdownMenuItem
                            onClick={() => {
                              setSortField("");
                              setSortDirection("asc");
                            }}
                          >
                            Clear Sort
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="ml-auto text-muted-foreground text-sm">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, filteredUsers.length)} of{" "}
                    {filteredUsers.length}
                  </div>
                </div>
              </div>

              {/* Table with vertical scroll */}
              <div className="overflow-hidden rounded-lg border">
                <div
                  className="max-h-[600px] overflow-x-auto overflow-y-auto"
                  ref={tableScrollRef}
                >
                  <table
                    className="w-full"
                    style={{ minWidth: "100%", tableLayout: "auto" }}
                  >
                    <thead className="sticky top-0 z-10 bg-muted">
                      <tr>
                        {visibleColumns.name && (
                          <th
                            className="relative cursor-pointer whitespace-nowrap px-2 py-3 text-left font-semibold text-sm transition-colors hover:bg-muted/80 sm:px-4"
                            onClick={() => handleSort("name")}
                            style={{
                              width: columnWidths.name
                                ? `${columnWidths.name}px`
                                : "auto",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              Name
                              {sortField === "name" && (
                                <span className="text-muted-foreground">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </div>
                            <div
                              className="absolute top-0 right-0 z-20 h-full w-1 cursor-col-resize hover:bg-primary/50"
                              onClick={(e) => e.stopPropagation()}
                              onMouseDown={(e) => handleResizeStart("name", e)}
                            />
                          </th>
                        )}
                        {visibleColumns.email && (
                          <th
                            className="relative cursor-pointer whitespace-nowrap px-2 py-3 text-left font-semibold text-sm transition-colors hover:bg-muted/80 sm:px-4"
                            onClick={() => handleSort("email")}
                            style={{
                              width: columnWidths.email
                                ? `${columnWidths.email}px`
                                : "auto",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              Email
                              {sortField === "email" && (
                                <span className="text-muted-foreground">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </div>
                            <div
                              className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-primary/50"
                              onMouseDown={(e) => handleResizeStart("email", e)}
                            />
                          </th>
                        )}
                        {visibleColumns.role && (
                          <th
                            className="relative cursor-pointer whitespace-nowrap px-2 py-3 text-left font-semibold text-sm transition-colors hover:bg-muted/80 sm:px-4"
                            onClick={() => handleSort("role")}
                            style={{
                              width: columnWidths.role
                                ? `${columnWidths.role}px`
                                : "auto",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              Role
                              {sortField === "role" && (
                                <span className="text-muted-foreground">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </div>
                            <div
                              className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-primary/50"
                              onMouseDown={(e) => handleResizeStart("role", e)}
                            />
                          </th>
                        )}
                        {visibleColumns.status && (
                          <th
                            className="relative cursor-pointer whitespace-nowrap px-2 py-3 text-left font-semibold text-sm transition-colors hover:bg-muted/80 sm:px-4"
                            onClick={() => handleSort("status")}
                            style={{
                              width: columnWidths.status
                                ? `${columnWidths.status}px`
                                : "auto",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              Status
                              {sortField === "status" && (
                                <span className="text-muted-foreground">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </div>
                            <div
                              className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-primary/50"
                              onMouseDown={(e) =>
                                handleResizeStart("status", e)
                              }
                            />
                          </th>
                        )}
                        {visibleColumns.lastModified && (
                          <th
                            className="relative cursor-pointer whitespace-nowrap px-2 py-3 text-left font-semibold text-sm transition-colors hover:bg-muted/80 sm:px-4"
                            onClick={() => handleSort("lastModified")}
                            style={{
                              width: columnWidths.lastModified
                                ? `${columnWidths.lastModified}px`
                                : "auto",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              Last Modified
                              {sortField === "lastModified" && (
                                <span className="text-muted-foreground">
                                  {sortDirection === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </div>
                            <div
                              className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-primary/50"
                              onMouseDown={(e) =>
                                handleResizeStart("lastModified", e)
                              }
                            />
                          </th>
                        )}
                        <th className="whitespace-nowrap px-2 py-3 text-left font-semibold text-sm sm:px-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.map((user) => (
                        <tr
                          className="cursor-pointer border-t hover:bg-muted/50"
                          key={user.id}
                          onClick={() => handleRowClick(user)}
                        >
                          {visibleColumns.name && (
                            <td
                              className="whitespace-nowrap px-2 py-3 text-sm sm:px-4"
                              style={{
                                width: columnWidths.name
                                  ? `${columnWidths.name}px`
                                  : "auto",
                              }}
                            >
                              {editingId === user.id ? (
                                <input
                                  autoFocus
                                  className="w-full rounded border bg-card/80 px-2 py-1 text-foreground text-sm"
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      name: e.target.value,
                                    })
                                  }
                                  type="text"
                                  value={editData.name || ""}
                                />
                              ) : (
                                user.name
                              )}
                            </td>
                          )}
                          {visibleColumns.email && (
                            <td
                              className="whitespace-nowrap px-2 py-3 text-muted-foreground text-sm sm:px-4"
                              style={{
                                width: columnWidths.email
                                  ? `${columnWidths.email}px`
                                  : "auto",
                              }}
                            >
                              {editingId === user.id ? (
                                <input
                                  className="w-full rounded border bg-card/80 px-2 py-1 text-foreground text-sm"
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      email: e.target.value,
                                    })
                                  }
                                  type="email"
                                  value={editData.email || ""}
                                />
                              ) : (
                                user.email
                              )}
                            </td>
                          )}
                          {visibleColumns.role && (
                            <td
                              className="whitespace-nowrap px-2 py-3 text-sm sm:px-4"
                              style={{
                                width: columnWidths.role
                                  ? `${columnWidths.role}px`
                                  : "auto",
                              }}
                            >
                              {editingId === user.id ? (
                                <select
                                  className="rounded border bg-card/80 px-2 py-1 text-foreground text-sm"
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      role: e.target.value,
                                    })
                                  }
                                  value={editData.role || ""}
                                >
                                  <option value="Admin">Admin</option>
                                  <option value="Editor">Editor</option>
                                  <option value="Viewer">Viewer</option>
                                </select>
                              ) : (
                                <span className="rounded-md bg-secondary px-2 py-1 text-xs">
                                  {user.role}
                                </span>
                              )}
                            </td>
                          )}
                          {visibleColumns.status && (
                            <td
                              className="whitespace-nowrap px-2 py-3 text-sm sm:px-4"
                              style={{
                                width: columnWidths.status
                                  ? `${columnWidths.status}px`
                                  : "auto",
                              }}
                            >
                              {editingId === user.id ? (
                                <select
                                  className="rounded border bg-card/80 px-2 py-1 text-foreground text-sm"
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      status: e.target.value,
                                    })
                                  }
                                  value={editData.status || ""}
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                              ) : (
                                <span
                                  className={`rounded-md px-2 py-1 text-xs ${
                                    user.status === "Active"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              )}
                            </td>
                          )}
                          {visibleColumns.lastModified && (
                            <td
                              className="whitespace-nowrap px-2 py-3 text-muted-foreground text-sm sm:px-4"
                              style={{
                                width: columnWidths.lastModified
                                  ? `${columnWidths.lastModified}px`
                                  : "auto",
                              }}
                            >
                              {user.lastModified}
                            </td>
                          )}
                          <td className="whitespace-nowrap px-2 py-3 text-sm sm:px-4">
                            {editingId === user.id ? (
                              <div
                                className="flex gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleSave(user.id)}
                                  size="sm"
                                  title="Save"
                                  variant="ghost"
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button
                                  className="h-7 w-7 p-0"
                                  onClick={handleCancel}
                                  size="sm"
                                  title="Cancel"
                                  variant="ghost"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div
                                className="flex gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleEdit(user)}
                                  size="sm"
                                  title="Edit"
                                  variant="ghost"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleDeleteClick(user.id)}
                                  size="sm"
                                  title="Delete"
                                  variant="ghost"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between gap-2 border-t pt-4">
                  <div className="text-muted-foreground text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      className="gap-1"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                      size="sm"
                      variant="outline"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">First</span>
                    </Button>
                    <Button
                      className="gap-1"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      size="sm"
                      variant="outline"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>
                    <div className="flex items-center gap-1 px-2">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum: number;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <Button
                              className="min-w-[2.5rem]"
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              size="sm"
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}
                    </div>
                    <Button
                      className="gap-1"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      size="sm"
                      variant="outline"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      className="gap-1"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      size="sm"
                      variant="outline"
                    >
                      <span className="hidden sm:inline">Last</span>
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

function ProfessionalResumeSPA() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
    >
      <Card className={marketingCardClass}>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="relative border-b pb-4 text-left sm:pb-6 sm:text-center">
              <div className="absolute top-14 right-0 sm:top-0 sm:right-auto sm:left-4">
                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-border sm:h-24 sm:w-24">
                  <img
                    alt="Profile"
                    className="h-full w-full object-cover"
                    src="/sample_profile.png"
                    style={{
                      objectPosition: "center 40%",
                      transform: "scale(1.5) translateY(15%)",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3 pr-24 sm:mb-4 sm:pr-0">
                <h2 className="mb-2 font-bold text-2xl sm:text-3xl">
                  John Doe
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Senior Software Engineer
                </p>
              </div>
              <div className="flex flex-col gap-2 text-xs sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 sm:text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                  <span className="break-all">john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                  <span>+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                  <span className="break-all">linkedin.com/in/johndoe</span>
                </div>
                <div className="flex items-center gap-1">
                  <Github className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                  <span className="break-all">github.com/johndoe</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-lg sm:mb-4 sm:text-xl">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                Experience
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 pl-3 sm:pl-4">
                  <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">
                        Senior Software Engineer
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Tech Company Inc.
                      </p>
                    </div>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      2020 - Present
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                    Lead development of scalable web applications using React
                    and Node.js. Mentored junior developers and improved code
                    quality standards.
                  </p>
                </div>
                <div className="border-l-2 pl-3 sm:pl-4">
                  <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">
                        Software Engineer
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Startup Co.
                      </p>
                    </div>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      2018 - 2020
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground text-xs sm:text-sm">
                    Built and maintained customer-facing features. Collaborated
                    with design team to implement responsive UI components.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-lg sm:mb-4 sm:text-xl">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                Education
              </h3>
              <div className="border-l-2 pl-3 sm:pl-4">
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">
                      Bachelor of Science in Computer Science
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      University of Technology
                    </p>
                  </div>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    2014 - 2018
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-lg sm:mb-4 sm:text-xl">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs sm:px-3 sm:text-sm">
                  React
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs sm:px-3 sm:text-sm">
                  TypeScript
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs sm:px-3 sm:text-sm">
                  Node.js
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs sm:px-3 sm:text-sm">
                  PostgreSQL
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs sm:px-3 sm:text-sm">
                  AWS
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1 text-xs sm:px-3 sm:text-sm">
                  Docker
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
