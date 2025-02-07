'use server';

import { createAdminClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

export async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClient();

    // Fetch rooms
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id
    );

    // Revalidate the cache for this path
    // await revalidatePath('/', 'layout');

    return room;

  } catch (error) {
    console.log('Failed to get room', error);
    redirect('/error');
  }
}
