
const RoleBadge = ({ role }) => {
  const roleLabel = {
    user: "User A/C",
    admin: "Admin A/C",
    superadmin: "Super Admin A/C",
  };

  const getClasses = () => {
    if (role === "superadmin") {
      return "bg-[#f0fdfa] text-[#0f766e] border-[#99f6e4] dark:bg-[#0f766e]/10 dark:text-[#2dd4bf] dark:border-[#0f766e]/30";
    }
    if (role === "admin") {
      return "bg-[#f5f3ff] text-[#6d28d9] border-[#ddd6fe] dark:bg-[#6d28d9]/10 dark:text-[#a78bfa] dark:border-[#6d28d9]/30";
    }
    return "bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe] dark:bg-[#1d4ed8]/10 dark:text-[#60a5fa] dark:border-[#1d4ed8]/30";
  };

  const getDotColor = () => {
    if (role === "superadmin") return "bg-[#0f766e] dark:bg-[#2dd4bf]";
    if (role === "admin") return "bg-[#7c3aed] dark:bg-[#a78bfa]";
    return "bg-[#2563eb] dark:bg-[#60a5fa]";
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-[9px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border transition-colors ${getClasses()}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getDotColor()}`} />
      <span>{roleLabel[role] || "User A/C"}</span>
    </span>
  );
};

export default RoleBadge;