"use client";
import React from "react";
import { useState } from 'react';


function MainComponent() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: 2,
      name: "Editor User",
      email: "editor@example.com",
      role: "editor",
      status: "active",
    },
    {
      id: 3,
      name: "Viewer User",
      email: "viewer@example.com",
      role: "viewer",
      status: "inactive",
    },
  ]);
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "admin",
      permissions: ["create", "read", "update", "delete"],
    },
    { id: 2, name: "editor", permissions: ["create", "read", "update"] },
    { id: 3, name: "viewer", permissions: ["read"] },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const handleUserSubmit = (user) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setShowUserModal(false);
    setEditingUser(null);
  };

  const handleRoleSubmit = (role) => {
    if (editingRole) {
      setRoles(roles.map((r) => (r.id === editingRole.id ? role : r)));
    } else {
      setRoles([...roles, { ...role, id: roles.length + 1 }]);
    }
    setShowRoleModal(false);
    setEditingRole(null);
  };

  

  return (  
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-roboto mb-6">Role-Based Access Control</h1>

        <div className="flex mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded ${
              activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={`px-4 py-2 rounded ${
              activeTab === "roles" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Roles
          </button>
        </div>

        {activeTab === "users" ? (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-roboto">User Management</h2>
              <button
                onClick={() => setShowUserModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowUserModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() =>
                            setUsers(users.filter((u) => u.id !== user.id))
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-roboto">Role Management</h2>
              <button
                onClick={() => setShowRoleModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Role
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Permissions</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.id} className="border-t">
                      <td className="px-6 py-4">{role.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setEditingRole(role);
                            setShowRoleModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() =>
                            setRoles(roles.filter((r) => r.id !== role.id))
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-roboto mb-4">
                {editingUser ? "Edit User" : "Add User"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleUserSubmit({
                    id: editingUser?.id,
                    name: formData.get("name"),
                    email: formData.get("email"),
                    role: formData.get("role"),
                    status: formData.get("status"),
                  });
                }}
              >
                <input
                  name="name"
                  defaultValue={editingUser?.name}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Name"
                  required
                />
                <input
                  name="email"
                  defaultValue={editingUser?.email}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Email"
                  type="email"
                  required
                />
                <select
                  name="role"
                  defaultValue={editingUser?.role}
                  className="w-full mb-4 p-2 border rounded"
                  required
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <select
                  name="status"
                  defaultValue={editingUser?.status}
                  className="w-full mb-4 p-2 border rounded"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserModal(false);
                      setEditingUser(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showRoleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-roboto mb-4">
                {editingRole ? "Edit Role" : "Add Role"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const permissions = [
                    "create",
                    "read",
                    "update",
                    "delete",
                  ].filter((p) => formData.get(p));
                  handleRoleSubmit({
                    id: editingRole?.id,
                    name: formData.get("name"),
                    permissions,
                  });
                }}
              >
                <input
                  name="name"
                  defaultValue={editingRole?.name}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Role Name"
                  required
                />
                <div className="mb-4">
                  <p className="mb-2">Permissions:</p>
                  {["create", "read", "update", "delete"].map((permission) => (
                    <label
                      key={permission}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        name={permission}
                        defaultChecked={editingRole?.permissions.includes(
                          permission
                        )}
                      />
                      <span className="capitalize">{permission}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRoleModal(false);
                      setEditingRole(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;
