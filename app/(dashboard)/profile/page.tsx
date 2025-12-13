//12231945 bifaqih zulfa mademade design for profil page
"use client";
import React, { useState } from 'react';
// Import icons from Lucide-React
import { 
    User, 
    AlertTriangle, 
    Lock,      
    Trash2,        
    Info
} from 'lucide-react'; 

// --- MODEL DATA: User Profile (Mock Data) ---
interface UserProfile {
  namaLengkap: string;
}

const mockUserProfile: UserProfile = {
  namaLengkap: 'Nama', // Placeholder name as seen in the image
};

/**
 * Component for the functional sections (grey boxes)
 */
const FunctionBox: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
    // Uses bg-gray-200 for the main container, matching the image's shade
    <div className={`bg-gray-200 p-6 rounded-none ${className}`}>
        {children}
    </div>
);

/**
 * Main Profile Settings Page Component
 */
const ProfilePage: React.FC = () => {
    const user = mockUserProfile; 

    // State for password fields (kept static/disabled for this mock interface)
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Placeholder function for disabled buttons
    const handleAction = (action: string) => {
        // This is a mock interface, so all actions are logged instead of executed
        console.log(`Action ${action} is disabled in this mock interface.`);
    };

    return (
        // Main wrapper uses white background as base, centered content
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
          
            {/* HEADER - Wide, dark text, similar to the image's header area */}
            <header className="w-full border-b border-gray-300 shadow-sm bg-white">
                <div className="mx-auto max-w-xl p-4 md:p-6">
                    <h1 className="text-2xl font-bold text-black">
                        Aplikasi Penentu Kandidat Mustahik
                    </h1>
                </div>
            </header>

            {/* MAIN CONTENT - Centered, fixed width container */}
            <main className="flex-grow flex justify-center p-4 md:p-6">
                
                <div className="w-full max-w-xl space-y-6">
                    
                    {/* PROFILE INFORMATION SECTION */}
                    <div className="mb-6">
                        <div className="flex items-center space-x-2 text-gray-800 mb-1">
                            <Info className="w-5 h-5"/>
                            <p className="font-semibold text-base">Informasi Profil</p>
                        </div>
                        <h2 className="text-3xl font-extrabold text-black">
                            {user.namaLengkap}
                        </h2>
                    </div>


                    {/* CHANGE PASSWORD SECTION (Grey Box) */}
                    <FunctionBox>
                        <div className="flex items-center space-x-2 text-black mb-4">
                            <Lock className="w-5 h-5"/>
                            <h3 className="text-lg font-semibold">Ubah Kata Sandi</h3>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleAction('Ubah Sandi'); }} className="space-y-4">
                            
                            {/* Current Password */}
                            <div>
                                <label htmlFor="currentPassword" className="text-sm text-gray-700 block mb-1">
                                    Kata Sandi Sekarang
                                </label>
                                <input
                                    id="currentPassword"
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-gray-500 focus:border-gray-500 bg-white cursor-not-allowed"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    disabled 
                                />
                            </div>

                            {/* New Password */}
                            <div>
                                <label htmlFor="newPassword" className="text-sm text-gray-700 block mb-1">
                                    Kata Sandi
                                </label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-gray-500 focus:border-gray-500 bg-white cursor-not-allowed"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled 
                                />
                            </div>

                            {/* Confirm New Password */}
                            <div>
                                <label htmlFor="confirmNewPassword" className="text-sm text-gray-700 block mb-1">
                                    Konfirmasi Kata Sandi
                                </label>
                                <input
                                    id="confirmNewPassword"
                                    type="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-gray-500 focus:border-gray-500 bg-white cursor-not-allowed"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    disabled 
                                />
                            </div>

                            {/* Change Password Button (Dark, on the bottom right) */}
                            <div className="flex justify-end pt-2">
                                <button 
                                    type="submit" 
                                    className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-none transition hover:bg-gray-900 opacity-75 cursor-default"
                                    disabled 
                                >
                                    Ubah Sandi
                                </button>
                            </div>
                        </form>
                    </FunctionBox>

                    {/* DANGER ZONE (Grey Box) */}
                    <FunctionBox>
                        <div className="flex items-center space-x-2 text-black mb-2">
                            <AlertTriangle className="w-5 h-5"/>
                            <h3 className="text-lg font-semibold text-black">Berbahaya</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            Tindakan permanen dan tidak dapat diakses setelahnya.
                        </p>
                        
                        <div className="space-y-4">
                            
                            {/* Option: Delete Candidate Data */}
                            <div className="flex items-center justify-between py-2 border-t border-gray-300">
                                <div className="flex items-start space-x-3">
                                    <Trash2 className="w-5 h-5 text-gray-700"/>
                                    <div>
                                        <p className="font-medium text-black">Hapus Semua Data Kandidat</p>
                                        <p className="text-xs text-gray-600">Menghapus data kandidat yang tersimpan dalam sistem.</p>
                                    </div>
                                </div>
                                <button 
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-none transition opacity-75 cursor-default hover:bg-red-700"
                                    disabled
                                    onClick={() => handleAction('Hapus Data')}
                                >
                                    Hapus Data
                                </button>
                            </div>
                            
                            {/* Option: Delete Account */}
                            <div className="flex items-center justify-between py-2 border-t border-gray-300">
                                <div className="flex items-start space-x-3">
                                    <User className="w-5 h-5 text-gray-700"/>
                                    <div>
                                        <p className="font-medium text-black">Hapus Akun</p>
                                        <p className="text-xs text-gray-600">Menghapus akun dan semua data yang terkait di dalamnya.</p>
                                    </div>
                                </div>
                                <button 
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-none transition opacity-75 cursor-default hover:bg-red-700"
                                    disabled
                                    onClick={() => handleAction('Hapus Akun')}
                                >
                                    Hapus Akun
                                </button>
                            </div>
                        </div>

                    </FunctionBox>

                </div>

            </main>

            {/* FOOTER - Fixed text on the bottom */}
            <footer className="w-full border-t border-gray-300 mt-auto bg-white">
                <div className="mx-auto max-w-xl p-4 text-center text-sm text-gray-800">
                    Copyright &copy; 2025 - Aplikasi penentu kandidat mustahik
                </div>
            </footer>
        </div>
    );
};

export default ProfilePage;