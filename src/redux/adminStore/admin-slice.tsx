import { createSlice } from "@reduxjs/toolkit";

type AdminProfile = {
  id: number;
  image: string;
  clubName: string;
  description: string;
  email: string;
  contactInfo: string;
};
const initialAdminState = {
  admin: null as AdminProfile | null,
};
const adminSlice = createSlice({
  name: "admin",
  initialState: initialAdminState,
  reducers: {
    setAdminProfile(state, action) {
      const { id, image, clubName, description, email, contactInfo } =
        action.payload;
      state.admin = {
        id,
        image,
        clubName,
        description,
        email,
        contactInfo,
      };
    },
    updateAdminProfile(state, action) {
      const { description, contactInfo } = action.payload;
      if (state.admin) {
        if (description !== undefined) state.admin.description = description;
        if (contactInfo !== undefined) state.admin.contactInfo = contactInfo;
      }
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;

export const fetchAdminProfileFromAPI = async (state: AdminProfile) => {
  const response = await fetch(
    "http://localhost:8080/api/admin/profile" + state.id
  );
  if (!response.ok) {
    throw new Error("Failed to fetch admin profile");
  }
  const data = await response.json();
  if (!data || !data.id) {
    throw new Error("Invalid admin profile data");
  }

  return data as AdminProfile;
};
