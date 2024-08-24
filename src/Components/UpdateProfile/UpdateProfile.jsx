import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [message, setMessage] = useState("");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                await updateProfile(user, {
                    displayName: displayName,
                    photoURL: photoURL
                });
                setMessage("Profile updated successfully!");
            }
        } catch (error) {
            setMessage("Failed to update profile: " + error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Display Name</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Profile Photo URL</label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">Update Profile</button>
            </form>

            {user && (
                <div className="text-center mt-6">
                    <h2 className="text-xl font-bold mb-2">Current Profile</h2>
                    <img src={user.photoURL} alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-2" />
                    <p className="font-medium text-base">Name: {user.displayName}</p>
                    <p className="font-medium text-base">Email: {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default UpdateProfile;
