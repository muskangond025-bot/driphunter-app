"use client";

import React, { useState } from "react";
import AppHeader from "@/components/app-shell/AppHeader";
import AppPageLayout from "@/components/app-shell/AppPageLayout";

export default function MobileProfilePage() {
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Carter");
  const [email, setEmail] = useState("alex@driphunter.com");
  const [mobileNumber, setMobileNumber] = useState("+91 9876543210");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <AppPageLayout hasBottomNav={false} className="bg-zinc-50 dark:bg-zinc-950">
      <AppHeader showActions={true}
        variant="contextual"
        title="Profile Information"
        fallbackUrl="/mobile/account"
        rightAction={
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        }
      />

      <div className="p-4">
        <form onSubmit={handleSave} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-5 mt-4">
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">First Name</label>
            {isEditing ? (
              <input 
                type="text" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
              />
            ) : (
              <p className="text-sm font-bold text-zinc-900 dark:text-white px-2 py-1">{firstName}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Last Name</label>
            {isEditing ? (
              <input 
                type="text" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
              />
            ) : (
              <p className="text-sm font-bold text-zinc-900 dark:text-white px-2 py-1">{lastName}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
            {isEditing ? (
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
              />
            ) : (
              <p className="text-sm font-bold text-zinc-900 dark:text-white px-2 py-1">{email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Mobile Number</label>
            {isEditing ? (
              <input 
                type="tel" 
                value={mobileNumber} 
                onChange={e => setMobileNumber(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
              />
            ) : (
              <p className="text-sm font-bold text-zinc-900 dark:text-white px-2 py-1">{mobileNumber}</p>
            )}
          </div>

          {isEditing && (
            <button 
              type="submit"
              className="mt-4 w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs active:scale-95 transition-transform"
            >
              Save Details
            </button>
          )}

        </form>
      </div>
    </AppPageLayout>
  );
}
