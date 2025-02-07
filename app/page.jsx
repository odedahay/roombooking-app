// import rooms from '@/data/rooms.json';
import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
import {getAllRooms} from './actions/getAllRooms';
import { revalidateRooms } from './actions/revalidateRooms';

export default async function Home() {
  const rooms = await getAllRooms();

  // Optionally, you can trigger revalidation here if needed
  //await revalidateRooms();

  return (
    <>
      <Heading title='Available Rooms' />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} key={room.$id} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
}