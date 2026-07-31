import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/ui/date-picker"
import { ArrowLeft, Users, FileText, Briefcase, GraduationCap, Linkedin, Github, UserPlus, Download, Save, X, Mail, Phone, Edit, Trash2, User, Filter, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Columns, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/MobileMenu"
import { Seo } from "@/components/Seo"

type SPAType = "user-management" | "professional-resume"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastModified: string
  startDate?: string
  termDate?: string
  phone?: string
  department?: string
  supervisor?: string
  address?: string
  notes?: string
}

// Helper function to format datetime as "MMM D, YYYY h:mm A"
function formatDateTime(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12
  hours = hours ? hours : 12
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes
  return `${month} ${day}, ${year} ${hours}:${minutesStr} ${ampm}`
}

// Helper function to get current datetime formatted
function getCurrentDateTime(): string {
  return formatDateTime(new Date())
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export function SPAShowcase() {
  const [selectedSPA, setSelectedSPA] = useState<SPAType>("user-management")
  
  // Prevent scroll restoration on page load
  useEffect(() => {
    // Set immediately
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Force scroll to top multiple times to override browser restoration
    window.scrollTo(0, 0)
    // Use requestAnimationFrame to ensure it happens after browser restoration
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      // Also set on next frame for good measure
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Seo
        title="SPA Showcase"
        description="Interactive SPA examples from Unstacked Apps — user management and professional resume demos built with React."
        path="/spa-showcase"
      />
      {/* Navigation */}
      <motion.nav 
        className="container mx-auto px-4 py-3 sm:py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="brand-wrapper flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="Unstacked Apps" 
              className="brand-logo"
            />
            <div className="brand-container">
              <span className="brand-name">
                <span className="brand-name-thin">un</span>stacked
              </span>
              <span className="brand-subtitle">apps</span>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="sm:size-default whitespace-nowrap" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            {/* Mobile menu */}
            <div className="md:hidden flex items-center gap-2">
              <MobileMenu />
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Header */}
      <motion.section 
        className="container mx-auto px-4 py-8 sm:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/60 to-foreground/30"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            SPA Examples
          </motion.h1>
          <motion.p 
            className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-2"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Interactive examples of single-page applications
          </motion.p>
        </div>
      </motion.section>

      {/* SPA Selector */}
      <motion.section 
        className="container mx-auto px-4 pb-6 sm:pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-4">
          <Tabs 
            value={selectedSPA} 
            onValueChange={(value) => setSelectedSPA(value as SPAType)}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
              <TabsTrigger value="user-management" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="sm:hidden">User Management</span>
                <span className="hidden sm:inline">User Management (UMS)</span>
              </TabsTrigger>
              <TabsTrigger value="professional-resume" className="gap-2">
                <FileText className="h-4 w-4" />
                <span className="sm:hidden">Résumé</span>
                <span className="hidden sm:inline">Professional Résumé</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <motion.p 
            key={selectedSPA}
            className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedSPA === "user-management" 
              ? "Manage users with inline editing, search, and export capabilities"
              : "Responsive résumé layout optimized for all screen sizes"}
          </motion.p>
        </div>
      </motion.section>

      {/* SPA Content */}
      <motion.section 
        className="container mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="mx-auto max-w-6xl">
          {selectedSPA === "user-management" && <UserManagementSPA />}
          {selectedSPA === "professional-resume" && (
            <div className="relative">
              <Link 
                to="/resume-demo" 
                className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border hover:bg-muted transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">View Full Example</span>
                <span className="sm:hidden">Full</span>
              </Link>
              <ProfessionalResumeSPA />
            </div>
          )}
        </div>
      </motion.section>
    </div>
  )
}

// Generate 50 sample users - defined outside component to avoid calling Math.random during render
function generateDefaultUsers(): User[] {
  const firstNames = ["Sarah", "Michael", "Emily", "David", "Jessica", "James", "Maria", "Robert", "Lisa", "William", "Jennifer", "Richard", "Patricia", "Joseph", "Linda", "Thomas", "Barbara", "Charles", "Elizabeth", "Christopher", "Susan", "Daniel", "Karen", "Matthew", "Nancy", "Anthony", "Betty", "Mark", "Helen", "Donald", "Sandra", "Steven", "Donna", "Paul", "Carol", "Andrew", "Ruth", "Joshua", "Sharon", "Kenneth", "Michelle", "Kevin", "Laura", "Brian", "Sarah", "George", "Kimberly", "Edward", "Deborah", "Ronald"]
  const lastNames = ["Johnson", "Chen", "Rodriguez", "Kim", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez"]
  const roles = ["Admin", "Editor", "Viewer"]
  const statuses = ["Active", "Inactive"]
  
  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance", "Operations", "Support", "Product"]
  const supervisors = ["John Smith", "Jane Doe", "Mike Johnson", "Sarah Williams", "David Brown", "Lisa Anderson"]
  const addresses = ["123 Main St, San Francisco, CA", "456 Oak Ave, New York, NY", "789 Pine Rd, Austin, TX", "321 Elm St, Seattle, WA", "654 Maple Dr, Boston, MA"]
  
  const users: User[] = []
  const now = new Date()
  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
    const role = roles[Math.floor(Math.random() * roles.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    // Generate random datetime in the past (up to 30 days ago)
    const daysAgo = Math.floor(Math.random() * 30)
    const hoursAgo = Math.floor(Math.random() * 24)
    const minutesAgo = Math.floor(Math.random() * 60)
    const randomDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000))
    const lastModified = formatDateTime(randomDate)
    
    // Generate additional profile data - format as YYYY-MM-DD using local timezone
    const formatDateLocal = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    const startDate = formatDateLocal(new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1))
    const termDate = status === "Inactive" && Math.random() > 0.5 
      ? formatDateLocal(new Date(2023 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1))
      : undefined
    const phone = `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`
    const department = departments[Math.floor(Math.random() * departments.length)]
    const supervisor = supervisors[Math.floor(Math.random() * supervisors.length)]
    const address = addresses[Math.floor(Math.random() * addresses.length)]
    const notes = Math.random() > 0.7 ? "Key team member with excellent performance." : undefined
    
    users.push({ 
      id: i, 
      name, 
      email, 
      role, 
      status, 
      lastModified,
      startDate,
      termDate,
      phone,
      department,
      supervisor,
      address,
      notes
    })
  }
  return users
}

const DEFAULT_USERS = generateDefaultUsers()

function UserManagementSPA() {
  const STORAGE_KEY = "ums_users"

  // Load users from sessionStorage or use defaults
  const loadUsers = (): User[] => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error("Failed to load users from sessionStorage", e)
    }
    return DEFAULT_USERS
  }

  const [users, setUsers] = useState<User[]>(loadUsers)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<User>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [profileEditData, setProfileEditData] = useState<Partial<User>>({})
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<keyof User | "">("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [roleFilter, setRoleFilter] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const itemsPerPage = 25
  
  // Helper function to get default column visibility
  const getDefaultColumnVisibility = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
    return {
      name: true, // Always visible
      email: !isMobile, // Visible on desktop, hidden on mobile
      role: false, // Hidden by default on both mobile and desktop
      status: true, // Always visible
      lastModified: !isMobile, // Visible on desktop, hidden on mobile
      // Actions is always visible, not in this object
    }
  }

  // Column visibility state - defaults based on screen size
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(getDefaultColumnVisibility)
  
  // Column widths state - default to auto (fit content)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})
  
  // Resizing state
  const [resizingColumn, setResizingColumn] = useState<string | null>(null)
  const [resizeStartX, setResizeStartX] = useState(0)
  const [resizeStartWidth, setResizeStartWidth] = useState(0)
  
  // Wrapper function to handle column visibility changes
  // When columns are hidden, clear their widths so remaining columns can auto-resize
  const handleColumnVisibilityChange = (column: string, checked: boolean) => {
    const newVisibility = { ...visibleColumns, [column]: checked }
    setVisibleColumns(newVisibility)
    
    // If hiding a column, remove its width so remaining columns can auto-resize
    if (!checked && columnWidths[column]) {
      const newWidths = { ...columnWidths }
      delete newWidths[column]
      setColumnWidths(newWidths)
    }
  }
  const [nextId, setNextId] = useState(() => {
    const maxId = Math.max(...users.map(u => u.id), 0)
    return maxId + 1
  })

  // Save to sessionStorage whenever users change
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }, [users])
  
  // Ref for the scrollable table container
  const tableScrollRef = useRef<HTMLDivElement>(null)
  
  // Ensure table scrolls to top on mount
  useEffect(() => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollTop = 0
    }
  }, [])

  const handleAddUser = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const defaultStartDate = `${year}-${month}-${day}`
    
    setProfileEditData({
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
      startDate: defaultStartDate,
      phone: "",
      department: "",
      supervisor: "",
      address: "",
      notes: "",
      termDate: undefined
    })
    setIsAddingUser(true)
    setSelectedUserId(null)
    setProfileModalOpen(true)
  }

  const handleRowClick = (user: User) => {
    setSelectedUserId(user.id)
    setProfileEditData({ ...user })
    setIsAddingUser(false)
    setProfileModalOpen(true)
  }

  const handleProfileSave = () => {
    if (isAddingUser) {
      // Create new user
      const newUser: User = {
        id: nextId,
        name: profileEditData.name || "",
        email: profileEditData.email || "",
        role: profileEditData.role || "Viewer",
        status: profileEditData.status || "Active",
        lastModified: getCurrentDateTime(),
        startDate: profileEditData.startDate,
        termDate: profileEditData.termDate,
        phone: profileEditData.phone || "",
        department: profileEditData.department || "",
        supervisor: profileEditData.supervisor || "",
        address: profileEditData.address || "",
        notes: profileEditData.notes || ""
      }
      setUsers([newUser, ...users])
      setNextId(nextId + 1)
      setCurrentPage(1) // Reset to first page to show the new user
    } else if (selectedUserId !== null) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUserId ? { ...user, ...profileEditData, lastModified: getCurrentDateTime() } : user
      ))
    }
    setProfileModalOpen(false)
    setSelectedUserId(null)
    setProfileEditData({})
    setIsAddingUser(false)
  }

  const handleProfileCancel = () => {
    setProfileModalOpen(false)
    setSelectedUserId(null)
    setProfileEditData({})
    setIsAddingUser(false)
  }

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setEditData({ ...user })
    setIsNewUser(false)
  }

  const handleSave = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...editData, lastModified: getCurrentDateTime() } : user
    ))
    setEditingId(null)
    setEditData({})
    setIsNewUser(false)
  }

  const handleCancel = () => {
    if (isNewUser && editingId !== null) {
      // Remove the newly added user if canceling
      setUsers(users.filter(user => user.id !== editingId))
    }
    setEditingId(null)
    setEditData({})
    setIsNewUser(false)
  }

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (userToDelete !== null) {
      setUsers(users.filter(user => user.id !== userToDelete))
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleResetDemo = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setUsers(DEFAULT_USERS)
    setCurrentPage(1)
    handleSearchChange("")
    handleRoleFilterChange("")
    handleStatusFilterChange("")
    setSortField("")
    setSortDirection("asc")
    setNextId(51)
    // Reset column visibility to defaults
    setVisibleColumns(getDefaultColumnVisibility())
    // Reset column widths to auto (empty object)
    setColumnWidths({})
  }
  
  // Column resize handlers
  const handleResizeStart = (column: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get the actual column width from the DOM
    const th = (e.currentTarget as HTMLElement).closest('th')
    const currentWidth = th ? th.offsetWidth : (columnWidths[column] || 0)
    
    setResizingColumn(column)
    setResizeStartX(e.clientX)
    setResizeStartWidth(currentWidth)
  }
  
  // Prevent text selection while resizing
  useEffect(() => {
    if (resizingColumn) {
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'
    } else {
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
    
    return () => {
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [resizingColumn])
  
  useEffect(() => {
    if (!resizingColumn) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - resizeStartX
      const newWidth = Math.max(50, resizeStartWidth + diff) // Minimum width of 50px
      setColumnWidths(prev => ({ ...prev, [resizingColumn]: newWidth }))
    }
    
    const handleMouseUp = () => {
      setResizingColumn(null)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizingColumn, resizeStartX, resizeStartWidth])

  const handleSort = (field: keyof User) => {
    setCurrentPage(1)
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handleExport = (format: "json" | "csv") => {
    const filteredUsers = getFilteredAndSortedUsers()

    if (format === "json") {
      const dataStr = JSON.stringify(filteredUsers, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "users.json"
      link.click()
      URL.revokeObjectURL(url)
    } else if (format === "csv") {
      const headers = ["ID", "Name", "Email", "Role", "Status", "Last Modified"]
      const rows = filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.lastModified
      ])
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
      ].join("\n")
      
      const dataBlob = new Blob([csvContent], { type: "text/csv" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "users.csv"
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  const getFilteredAndSortedUsers = (): User[] => {
    let filtered = users.filter(user => {
      const matchesSearch = searchQuery === "" || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === "" || user.role === roleFilter
      const matchesStatus = statusFilter === "" || user.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })

    // Apply sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        // Special handling for lastModified - parse dates for proper sorting
        if (sortField === "lastModified") {
          const aDate = new Date(a.lastModified)
          const bDate = new Date(b.lastModified)
          if (isNaN(aDate.getTime()) || isNaN(bDate.getTime())) {
            // Fallback to string comparison if dates are invalid
            const aVal = a.lastModified ?? ""
            const bVal = b.lastModified ?? ""
            if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
            if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
            return 0
          }
          const diff = aDate.getTime() - bDate.getTime()
          return sortDirection === "asc" ? diff : -diff
        }
        
        const aVal = a[sortField] ?? ""
        const bVal = b[sortField] ?? ""
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }

  const filteredUsers = getFilteredAndSortedUsers()
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

  const userToDeleteName = userToDelete !== null 
    ? users.find(u => u.id === userToDelete)?.name || "this user"
    : "this user"

  const selectedUser = selectedUserId !== null 
    ? users.find(u => u.id === selectedUserId)
    : null

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{userToDeleteName}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Profile Modal */}
      <Dialog open={profileModalOpen} onOpenChange={(open) => {
        setProfileModalOpen(open)
        if (!open) {
          // Reset state when modal closes
          handleProfileCancel()
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isAddingUser ? "Add New User" : "User Profile"}</DialogTitle>
            <DialogDescription>
              {isAddingUser ? "Enter information for the new user" : "View and edit user information"}
            </DialogDescription>
          </DialogHeader>
          {(selectedUser || isAddingUser) && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <input
                    type="text"
                    value={profileEditData.name || ""}
                    onChange={(e) => setProfileEditData({ ...profileEditData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <input
                    type="email"
                    value={profileEditData.email || ""}
                    onChange={(e) => setProfileEditData({ ...profileEditData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone</label>
                  <input
                    type="tel"
                    value={profileEditData.phone || ""}
                    onChange={(e) => setProfileEditData({ ...profileEditData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Role</label>
                  <select
                    value={profileEditData.role || ""}
                    onChange={(e) => setProfileEditData({ ...profileEditData, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <select
                    value={profileEditData.status || ""}
                    onChange={(e) => setProfileEditData({ ...profileEditData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Department</label>
                  <input
                    type="text"
                    value={profileEditData.department || ""}
                    onChange={(e) => setProfileEditData({ ...profileEditData, department: e.target.value })}
                    placeholder="Engineering"
                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Supervisor</label>
                  <input
                    type="text"
                    value={profileEditData.supervisor || ""}
                    onChange={(e) => setProfileEditData({ ...profileEditData, supervisor: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground"
                  />
                </div>
                <div>
                  <DatePicker
                    value={profileEditData.startDate}
                    onChange={(date) => setProfileEditData({ ...profileEditData, startDate: date })}
                    label="Start Date"
                    placeholder="Select start date"
                  />
                </div>
                <div>
                  <DatePicker
                    value={profileEditData.termDate}
                    onChange={(date) => setProfileEditData({ ...profileEditData, termDate: date })}
                    label="Term Date"
                    placeholder="Select term date"
                  />
                </div>
                {!isAddingUser && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Modified</label>
                    <input
                      type="text"
                      value={profileEditData.lastModified || ""}
                      readOnly
                      className="w-full px-3 py-2 border rounded-md text-sm bg-muted text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Address</label>
                <input
                  type="text"
                  value={profileEditData.address || ""}
                  onChange={(e) => setProfileEditData({ ...profileEditData, address: e.target.value })}
                  placeholder="123 Main St, City, State ZIP"
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Notes</label>
                <textarea
                  value={profileEditData.notes || ""}
                  onChange={(e) => setProfileEditData({ ...profileEditData, notes: e.target.value })}
                  placeholder="Additional notes about this user..."
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md text-sm bg-background text-foreground resize-none"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleProfileCancel}>
              Cancel
            </Button>
            <Button onClick={handleProfileSave}>
              {isAddingUser ? "Add User" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card>
          <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Action bar - improved mobile layout */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" onClick={handleAddUser} className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add User</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Columns className="h-4 w-4" />
                        <span className="hidden sm:inline">Columns</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Show Columns</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.name}
                        onCheckedChange={(checked) => handleColumnVisibilityChange("name", checked)}
                      >
                        Name
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.email}
                        onCheckedChange={(checked) => handleColumnVisibilityChange("email", checked)}
                      >
                        Email
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.role}
                        onCheckedChange={(checked) => handleColumnVisibilityChange("role", checked)}
                      >
                        Role
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.status}
                        onCheckedChange={(checked) => handleColumnVisibilityChange("status", checked)}
                      >
                        Status
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.lastModified}
                        onCheckedChange={(checked) => handleColumnVisibilityChange("lastModified", checked)}
                      >
                        Last Modified
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-2">
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
                  <Button size="sm" variant="outline" onClick={handleResetDemo} className="gap-2">
                    <X className="h-4 w-4" />
                    <span className="hidden sm:inline">Reset Demo</span>
                  </Button>
                </div>
                <input
                  type="search"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm w-full md:w-auto md:min-w-[200px] bg-background text-foreground placeholder:text-muted-foreground"
                />
              </div>
              
              {/* Filters and Sort */}
              <div className="flex flex-wrap gap-2 items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filters</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Role</p>
                      <select
                        value={roleFilter}
                        onChange={(e) => handleRoleFilterChange(e.target.value)}
                        className="w-full px-2 py-1.5 border rounded-md text-sm bg-background text-foreground"
                      >
                        <option value="">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </div>
                    <div className="px-2 py-1.5">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Status</p>
                      <select
                        value={statusFilter}
                        onChange={(e) => handleStatusFilterChange(e.target.value)}
                        className="w-full px-2 py-1.5 border rounded-md text-sm bg-background text-foreground"
                      >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    {(roleFilter || statusFilter) && (
                      <div className="px-2 py-1.5 border-t">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            handleRoleFilterChange("")
                            handleStatusFilterChange("")
                          }}
                          className="w-full"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-2">
                      <ArrowUpDown className="h-4 w-4" />
                      <span className="hidden sm:inline">Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleSort("name")}>
                      Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("email")}>
                      Email {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("role")}>
                      Role {sortField === "role" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("status")}>
                      Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("lastModified")}>
                      Last Modified {sortField === "lastModified" && (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    {sortField && (
                      <>
                        <div className="border-t my-1" />
                        <DropdownMenuItem onClick={() => {
                          setSortField("")
                          setSortDirection("asc")
                        }}>
                          Clear Sort
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="text-sm text-muted-foreground ml-auto">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
                </div>
              </div>
            </div>
          
          {/* Table with vertical scroll */}
          <div className="border rounded-lg overflow-hidden">
            <div ref={tableScrollRef} className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full" style={{ tableLayout: 'auto', minWidth: '100%' }}>
                <thead className="bg-muted sticky top-0 z-10">
                  <tr>
                    {visibleColumns.name && (
                      <th 
                        className="px-2 sm:px-4 py-3 text-left text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors relative"
                        style={{ width: columnWidths.name ? `${columnWidths.name}px` : 'auto' }}
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-2">
                          Name
                          {sortField === "name" && (
                            <span className="text-muted-foreground">{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                        <div
                          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50 z-20"
                          onMouseDown={(e) => handleResizeStart("name", e)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </th>
                    )}
                    {visibleColumns.email && (
                      <th 
                        className="px-2 sm:px-4 py-3 text-left text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors relative"
                        style={{ width: columnWidths.email ? `${columnWidths.email}px` : 'auto' }}
                        onClick={() => handleSort("email")}
                      >
                        <div className="flex items-center gap-2">
                          Email
                          {sortField === "email" && (
                            <span className="text-muted-foreground">{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                        <div
                          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50"
                          onMouseDown={(e) => handleResizeStart("email", e)}
                        />
                      </th>
                    )}
                    {visibleColumns.role && (
                      <th 
                        className="px-2 sm:px-4 py-3 text-left text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors relative"
                        style={{ width: columnWidths.role ? `${columnWidths.role}px` : 'auto' }}
                        onClick={() => handleSort("role")}
                      >
                        <div className="flex items-center gap-2">
                          Role
                          {sortField === "role" && (
                            <span className="text-muted-foreground">{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                        <div
                          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50"
                          onMouseDown={(e) => handleResizeStart("role", e)}
                        />
                      </th>
                    )}
                    {visibleColumns.status && (
                      <th 
                        className="px-2 sm:px-4 py-3 text-left text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors relative"
                        style={{ width: columnWidths.status ? `${columnWidths.status}px` : 'auto' }}
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center gap-2">
                          Status
                          {sortField === "status" && (
                            <span className="text-muted-foreground">{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                        <div
                          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50"
                          onMouseDown={(e) => handleResizeStart("status", e)}
                        />
                      </th>
                    )}
                    {visibleColumns.lastModified && (
                      <th 
                        className="px-2 sm:px-4 py-3 text-left text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors relative"
                        style={{ width: columnWidths.lastModified ? `${columnWidths.lastModified}px` : 'auto' }}
                        onClick={() => handleSort("lastModified")}
                      >
                        <div className="flex items-center gap-2">
                          Last Modified
                          {sortField === "lastModified" && (
                            <span className="text-muted-foreground">{sortDirection === "asc" ? "↑" : "↓"}</span>
                          )}
                        </div>
                        <div
                          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50"
                          onMouseDown={(e) => handleResizeStart("lastModified", e)}
                        />
                      </th>
                    )}
                    <th className="px-2 sm:px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-t hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleRowClick(user)}
                    >
                      {visibleColumns.name && (
                        <td 
                          className="px-2 sm:px-4 py-3 text-sm whitespace-nowrap"
                          style={{ width: columnWidths.name ? `${columnWidths.name}px` : 'auto' }}
                        >
                          {editingId === user.id ? (
                            <input
                              type="text"
                              value={editData.name || ""}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              className="px-2 py-1 border rounded text-sm w-full bg-background text-foreground"
                              autoFocus
                            />
                          ) : (
                            user.name
                          )}
                        </td>
                      )}
                      {visibleColumns.email && (
                        <td 
                          className="px-2 sm:px-4 py-3 text-sm text-muted-foreground whitespace-nowrap"
                          style={{ width: columnWidths.email ? `${columnWidths.email}px` : 'auto' }}
                        >
                          {editingId === user.id ? (
                            <input
                              type="email"
                              value={editData.email || ""}
                              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                              className="px-2 py-1 border rounded text-sm w-full bg-background text-foreground"
                            />
                          ) : (
                            user.email
                          )}
                        </td>
                      )}
                      {visibleColumns.role && (
                        <td 
                          className="px-2 sm:px-4 py-3 text-sm whitespace-nowrap"
                          style={{ width: columnWidths.role ? `${columnWidths.role}px` : 'auto' }}
                        >
                          {editingId === user.id ? (
                            <select
                              value={editData.role || ""}
                              onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                              className="px-2 py-1 border rounded text-sm bg-background text-foreground"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Editor">Editor</option>
                              <option value="Viewer">Viewer</option>
                            </select>
                          ) : (
                            <span className="px-2 py-1 bg-secondary rounded-md text-xs">{user.role}</span>
                          )}
                        </td>
                      )}
                      {visibleColumns.status && (
                        <td 
                          className="px-2 sm:px-4 py-3 text-sm whitespace-nowrap"
                          style={{ width: columnWidths.status ? `${columnWidths.status}px` : 'auto' }}
                        >
                          {editingId === user.id ? (
                            <select
                              value={editData.status || ""}
                              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                              className="px-2 py-1 border rounded text-sm bg-background text-foreground"
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-md text-xs ${
                              user.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            }`}>
                              {user.status}
                            </span>
                          )}
                        </td>
                      )}
                      {visibleColumns.lastModified && (
                        <td 
                          className="px-2 sm:px-4 py-3 text-sm text-muted-foreground whitespace-nowrap"
                          style={{ width: columnWidths.lastModified ? `${columnWidths.lastModified}px` : 'auto' }}
                        >
                          {user.lastModified}
                        </td>
                      )}
                      <td className="px-2 sm:px-4 py-3 text-sm whitespace-nowrap">
                        {editingId === user.id ? (
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button size="sm" variant="ghost" onClick={() => handleSave(user.id)} className="h-7 w-7 p-0" title="Save">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={handleCancel} className="h-7 w-7 p-0" title="Cancel">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(user)} className="h-7 w-7 p-0" title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteClick(user.id)} className="h-7 w-7 p-0" title="Delete">
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
            <div className="flex items-center justify-between gap-2 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">First</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
                <div className="flex items-center gap-1 px-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <Button
                        key={pageNum}
                        size="sm"
                        variant={currentPage === pageNum ? "default" : "outline"}
                        onClick={() => setCurrentPage(pageNum)}
                        className="min-w-[2.5rem]"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="gap-1"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="gap-1"
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
  )
}

function ProfessionalResumeSPA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card>
        <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="text-left sm:text-center border-b pb-4 sm:pb-6 relative">
            <div className="absolute top-14 right-0 sm:top-0 sm:left-4 sm:right-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-border overflow-hidden">
                <img 
                  src="/sample_profile.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1.5) translateY(15%)', objectPosition: 'center 40%' }}
                />
              </div>
            </div>
            <div className="mb-3 sm:mb-4 pr-24 sm:pr-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">John Doe</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Senior Software Engineer</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">linkedin.com/in/johndoe</span>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="break-all">github.com/johndoe</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
              Experience
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Senior Software Engineer</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tech Company Inc.</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">2020 - Present</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Lead development of scalable web applications using React and Node.js. 
                  Mentored junior developers and improved code quality standards.
                </p>
              </div>
              <div className="border-l-2 pl-3 sm:pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Software Engineer</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Startup Co.</p>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">2018 - 2020</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Built and maintained customer-facing features. Collaborated with design team 
                  to implement responsive UI components.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
              Education
            </h3>
            <div className="border-l-2 pl-3 sm:pl-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Bachelor of Science in Computer Science</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">University of Technology</p>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">2014 - 2018</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">React</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">TypeScript</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Node.js</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">PostgreSQL</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">AWS</span>
              <span className="px-2.5 sm:px-3 py-1 bg-secondary rounded-md text-xs sm:text-sm">Docker</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
      </motion.div>
  )
}

