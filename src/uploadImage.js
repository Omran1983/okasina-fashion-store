import { supabase } from './supabaseClient';

export const uploadImage = async (file) => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (error) {
    console.error('Image upload error:', error);
    return null;
  }

  const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
  return data?.publicUrl || null;
};
