import { useState } from "react";

function UserDropdown({
  users,
  selectedEmail,
  setSelectedEmail,
  setCurrentPage,
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 filter users
  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full mb-4">

      {/* 🔥 BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="p-2 border rounded cursor-pointer bg-white"
      >
        {selectedEmail === "all"
          ? "All Users"
          : selectedEmail}
      </div>

      {/* 🔥 DROPDOWN */}
      {open && (
        <div className="absolute z-10 bg-white border rounded w-full mt-1 shadow max-h-60 overflow-y-auto">

          {/* 🔍 SEARCH INPUT */}
          <input
            type="text"
            placeholder="Search email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b outline-none"
          />

          {/* ALL OPTION */}
          <div
            onClick={() => {
              setSelectedEmail("all");
              setCurrentPage(1);
              setOpen(false);
            }}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            All Users
          </div>

          {/* USERS */}
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setSelectedEmail(user.email);
                setCurrentPage(1);
                setOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {user.email}
            </div>
          ))}

          {/* EMPTY */}
          {filteredUsers.length === 0 && (
            <p className="p-2 text-gray-500 text-sm">
              No users found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDropdown;