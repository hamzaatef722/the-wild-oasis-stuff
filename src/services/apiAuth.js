import { fi } from "date-fns/locale";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.log("Error", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Error", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error", error.message);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error", error.message);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1. update only one of fullName or password (same function work with two forms)
  let updatedUser;
  if (password) updatedUser = { password };
  if (fullName) updatedUser = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedUser);
  if (error) {
    console.log("Error", error.message);
    throw new Error(error.message);
  }
  if (!avatar) return data;

  // 2. if there is an avatar, upload the avatar to avatars package
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.log("Error", storageError.message);
    throw new Error(storageError.message);
  }

  // 3. updata the user with the avatar
  const { data: updatedData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarError) {
    console.log("Error", avatarError.message);
    throw new Error(avatarError.message);
  }
  return updatedData;
}
