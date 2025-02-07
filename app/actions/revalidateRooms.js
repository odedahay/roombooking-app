// app/actions/revalidateRooms.js
'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateRooms() {
  try {
    await revalidatePath('/', 'layout');
    console.log('Revalidated path: /');
  } catch (error) {
    console.log('Failed to revalidate path', error);
  }
}