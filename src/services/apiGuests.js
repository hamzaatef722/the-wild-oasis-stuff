// services/apiGuests.js
import supabase from "./supabase";

export async function findOrCreateGuest({
  email,
  nationalID,
  fullName,
  nationality,
  countryFlag,
}) {
  const { data: existingGuest, error: fetchError } = await supabase
    .from("guests")
    .select("*")
    .or(`email.eq.${email},nationalID.eq.${nationalID}`)
    .maybeSingle();

  if (fetchError) throw new Error("Could not check guest data");
  if (existingGuest) return existingGuest;

  const { data: newGuest, error: insertError } = await supabase
    .from("guests")
    .insert([{ email, nationalID, fullName, nationality, countryFlag }])
    .select()
    .single();

  if (insertError) throw new Error("Could not register new guest");
  console.log("New guest created:", newGuest);
  return newGuest;
}
