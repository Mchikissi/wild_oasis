import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(){
  
const { data: cabins, error } = await supabase
.from('cabins')
.select('*')

if(error){
  console.error(error);
  throw new Error('cabins could not be loaded')
}

return cabins;
}

export async function createEditCabin(cabin, id){

  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll('/', '')
  const imagePath = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`
  
  let query = supabase.from('cabins')

  //Create Cabin
  if(!id)

    query = query
    .insert([
      {...cabin, image: imagePath}
    ])
  
    
  //Edit Cabin
  if(id)

    query = query.update({...cabin, image: imagePath})
    .eq('id', id)

  const { data, error } = await query.select().single()

  if(error){
    console.log(error);
    throw new Error('could not create new cabin!')
  }

  if(hasImagePath) return data;

  const {error: storageError } = await supabase
    .storage
    .from('cabin_images')
    .upload(imageName, cabin.image, {
      cacheControl: '3600',
      upsert: false
    })

  if(storageError){
    await supabase
  .from('cabins')
  .delete()
  .eq('id', data.id)
  console.log(storageError);
  throw new Error('Cabin Image could not be uploaded and the cabin could not be created!');
  }

}

export async function deleteCabin(id){

  
  const { error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if(error){
    console.error(error)
    throw new Error('Could not delete the cabin!')
  }

}