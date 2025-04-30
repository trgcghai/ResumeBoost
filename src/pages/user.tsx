import UserProfileTable from "../components/table/UserProfileTable"; // Adjust the import path

export default function UsersPage() {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>
        <UserProfileTable />
      </div>
    </div>
  );
}
