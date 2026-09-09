import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("the cabins could not be loaded");
  }
  return cabins;
}

export async function getCabin(id) {
  const { data: cabin, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("the cabin could not be loaded");
  }
  return cabin;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("the cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();
  }

  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("the cabin could not be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "the cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}

export async function getAvailableCabins(startDate, endDate) {
  // كل الكابينات
  const { data: cabins, error: cabinsError } = await supabase
    .from("cabins")
    .select("*");

  if (cabinsError) throw new Error(cabinsError.message);

  // الحجوزات اللي بتتعارض مع الفترة دي
  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("cabinId")
    .lt("startDate", endDate)
    .gt("endDate", startDate);

  if (bookingsError) throw new Error(bookingsError.message);

  const bookedCabinIds = bookings.map((b) => b.cabinId);
  const availableCabins = cabins.filter(
    (cabin) => !bookedCabinIds.includes(cabin.id),
  );

  return availableCabins;
}
