'use server';
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function createSession(previousState,formData){

    const email = formData.get('email');
    const password = formData.get('password');
    
    const cookiesStore = await cookies();

    if(!email || !password){
        return {
            error: 'Email and password are required'
        }
    }

    // Get account instance
    const {account} = await createAdminClient();

    try {
        // Generate session
        const session = await account.createEmailPasswordSession(email, password);

        // Create cookie
        cookiesStore.set('appwrite-session', session.secret, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(session.expire),
            path: '/'
        })

        return{
            success:true
        }
    } catch (error) {   
        console.log('Authentication Error ', error);
        return {
            error: 'Authentication failed'
        }
    }
}
 
export default createSession;