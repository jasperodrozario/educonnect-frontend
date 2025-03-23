"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  IconEdit,
  IconDeviceFloppy,
  IconX,
  IconMail,
  IconPhone,
  IconSchool,
  IconUser,
} from "@tabler/icons-react";

// Mock initial user data - this would come from an API later
const initialUserData = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "(555) 123-4567",
  school: "Riverside High School",
  role: "Teacher",
  bio: "I've been teaching mathematics for 5 years and love finding creative ways to help students understand complex concepts.",
};

export function ProfileForm() {
  const [userData, setUserData] = useState(initialUserData);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState(initialUserData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = (field) => {
    setEditingField(field);
    setFormData({ ...userData });
    setErrors({});
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setEditingField(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return /^\S+@\S+\.\S+$/.test(value)
          ? null
          : "Please enter a valid email address";
      case "phone":
        return /^[\d\s()+-]+$/.test(value)
          ? null
          : "Please enter a valid phone number";
      default:
        return value.trim() ? null : "This field cannot be empty";
    }
  };

  const handleSave = async (field) => {
    // Validate the field
    const error = validateField(field, formData[field]);

    if (error) {
      setErrors({ [field]: error });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the user data
      setUserData({
        ...userData,
        [field]: formData[field],
      });

      setEditingField(null);
      setSuccessMessage("Profile updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrors({ [field]: "Failed to update. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldValue = (field, icon) => {
    const isEditing = editingField === field;
    const fieldError = errors[field];

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <label className="font-medium text-sm text-neutral-700 dark:text-neutral-300">
              {field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
          </div>

          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(field)}
              className="h-8 w-8 p-0 text-neutral-500"
            >
              <IconEdit size={16} />
            </Button>
          )}
        </div>

        {isEditing ? (
          <div>
            {field === "bio" ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                rows={4}
                className={cn(
                  "w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500",
                  fieldError
                    ? "border-red-300 dark:border-red-500"
                    : "border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800"
                )}
              />
            ) : (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500",
                  fieldError
                    ? "border-red-300 dark:border-red-500"
                    : "border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800"
                )}
              />
            )}

            {fieldError && (
              <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                {/* <IconAlertCircle size={14} /> */}
                <span>{fieldError}</span>
              </div>
            )}

            <div className="my-3 flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="text-neutral-600"
                disabled={isSubmitting}
              >
                <IconX size={16} />
              </Button>
              <Button
                size="sm"
                onClick={() => handleSave(field)}
                className="bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">•••</span>
                ) : (
                  <>
                    <IconDeviceFloppy />
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
            {field === "bio" ? (
              <p className="whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
                {userData[field]}
              </p>
            ) : (
              <p className="text-neutral-700 dark:text-neutral-300">
                {userData[field]}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {successMessage && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200 rounded-md border border-green-200 dark:border-green-800 flex items-center">
          {successMessage}
        </div>
      )}

      <div className="divide-y divide-neutral-200 dark:divide-neutral-900">
        {renderFieldValue(
          "fullName",
          <IconUser size={18} className="text-orange-600" />
        )}
        {renderFieldValue(
          "email",
          <IconMail size={18} className="text-orange-600" />
        )}
        {renderFieldValue(
          "phone",
          <IconPhone size={18} className="text-orange-600" />
        )}
        {renderFieldValue(
          "school",
          <IconSchool size={18} className="text-orange-600" />
        )}
        {renderFieldValue(
          "role",
          <IconUser size={18} className="text-orange-600" />
        )}
        {renderFieldValue(
          "bio",
          <IconEdit size={18} className="text-orange-600" />
        )}
      </div>
    </div>
  );
}
