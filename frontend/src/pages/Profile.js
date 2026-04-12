import { useState, useEffect } from "react";
import {
  User,
  Crown,
  Shield,
  Bell,
  Link,
  Trash2,
  Upload,
  Save,
} from "lucide-react";
import API from "../api"; // ✅ ADDED

/* ---------- MAIN COMPONENT ---------- */
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH PROFILE ---------- */
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();

      console.log("PROFILE DATA:", data);

      setProfile(
        data || {
          name: "",
          email: "",
          mobile: "",
          role: "",
          plan: "",
          avatar: "",
          occupation: "",
          location: "",
          bio: "",
        }
      );
    } catch (err) {
      console.error("Fetch profile error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ---------- SAVE PROFILE ---------- */
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API}/api/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();

      console.log("SAVE RESPONSE:", data);

      alert("Profile saved successfully");

      fetchProfile();
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (err) {
      console.error("Save profile error:", err);
    }
  };

  /* ---------- AVATAR UPLOAD ---------- */
  const uploadAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfile({ ...profile, avatar: reader.result });
    };

    reader.readAsDataURL(file);
  };

  /* ---------- DELETE PROFILE ---------- */
  const deleteProfile = async () => {
    if (!window.confirm("Delete profile permanently?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API}/api/profile`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      window.dispatchEvent(new Event("profileUpdated"));
      window.location.reload();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  /* ---------- LOADING ---------- */
  if (loading || !profile) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="relative">

          <img
            src={profile.avatar || "https://i.pravatar.cc/150?img=12"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />

          <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full cursor-pointer">
            <Upload size={14} />
            <input
              type="file"
              className="hidden"
              onChange={uploadAvatar}
            />
          </label>

        </div>

        <div>
          <div className="text-xl font-bold text-slate-800">
            {profile.name || "No Name"}
          </div>

          <div className="text-sm text-slate-500">
            {profile.role || "User"}
          </div>

          <div className="flex items-center gap-1 text-indigo-600 text-sm">
            <Crown size={14} /> {profile.plan || "Free"} Plan
          </div>
        </div>
      </div>

      {/* PROFILE INFO */}
      <Card icon={<User />} title="Profile Information">

        <Input label="Full Name" value={profile.name}
          onChange={(v) => setProfile({ ...profile, name: v })} />

        <Input label="Email" value={profile.email}
          onChange={(v) => setProfile({ ...profile, email: v })} />

        <Input label="Mobile" value={profile.mobile}
          onChange={(v) => setProfile({ ...profile, mobile: v })} />

        <Input label="Occupation" value={profile.occupation}
          onChange={(v) => setProfile({ ...profile, occupation: v })} />

        <Input label="Location" value={profile.location}
          onChange={(v) => setProfile({ ...profile, location: v })} />

        <Textarea label="Bio" value={profile.bio}
          onChange={(v) => setProfile({ ...profile, bio: v })} />

        <button
          onClick={saveProfile}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg mt-2"
        >
          <Save size={16} />
          Save Profile
        </button>

      </Card>

      {/* REST UI SAME (NO CHANGE) */}
      <Card icon={<Crown />} title="Plan & Usage">
        <Usage label="AI Insights" value={78} max={100} />
        <Usage label="Storage" value={45} max={100} />
        <Usage label="API Calls" value={62} max={100} />
      </Card>

      <Card icon={<Shield />} title="Security">
        <Status label="2-Factor Auth" value="Enabled" />
        <Status label="Biometric" value="Disabled" />
        <Status label="Last Login" value="Today" />
      </Card>

      <Card icon={<Bell />} title="Notifications">
        <Status label="Email Alerts" value="Active" />
        <Status label="Goal Alerts" value="Active" />
        <Status label="AI Reports" value="Weekly" />
      </Card>

      <Card icon={<Link />} title="Connected Services">
        <Status label="Google" value="Connected" />
        <Status label="Bank Sync" value="Active" />
        <Status label="API Access" value="Enabled" />
      </Card>

      <Card icon={<Trash2 />} title="Danger Zone" danger>
        <button
          onClick={deleteProfile}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete Profile
        </button>
      </Card>

    </div>
  );
}

/* ---------- UI COMPONENTS (UNCHANGED) ---------- */

function Card({ icon, title, children, danger }) {
  return (
    <div className="bg-white border rounded-2xl shadow p-6 space-y-4">
      <div className={`flex items-center gap-2 font-semibold ${danger ? "text-red-600" : "text-slate-800"}`}>
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <div className="text-sm text-slate-500 mb-1">{label}</div>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <div className="text-sm text-slate-500 mb-1">{label}</div>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
        rows={3}
      />
    </div>
  );
}

function Usage({ label, value, max }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded">
        <div className="h-2 bg-indigo-600 rounded" style={{ width: pct + "%" }} />
      </div>
    </div>
  );
}

function Status({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span className="text-indigo-600 font-medium">{value}</span>
    </div>
  );
}