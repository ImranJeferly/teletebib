// Admin authentication service for Firebase
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from './firebase';

// Admin email for authorization checks
const ADMIN_EMAIL = 'imranjeferly@gmail.com';

// Sign in admin user
export const signInAdmin = async (email: string, password: string): Promise<User> => {
  try {
    // Firebase Authentication handles credential validation
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Admin sign in error:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/user-not-found') {
      throw new Error('Admin istifadəçisi tapılmadı!');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Yanlış şifrə!');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Yanlış email formatı!');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Çox cəhd! Bir müddət sonra yenidən cəhd edin.');
    } else {
      throw new Error(error.message || 'Giriş xətası baş verdi!');
    }
  }
};

// Sign out admin user
export const signOutAdmin = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Admin sign out error:', error);
    throw new Error('Çıxış xətası baş verdi!');
  }
};

// Listen to admin auth state changes
export const onAdminAuthStateChanged = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Check if current user is admin
export const isCurrentUserAdmin = (): boolean => {
  const user = auth.currentUser;
  return user?.email === ADMIN_EMAIL;
};

// Get current admin user
export const getCurrentAdminUser = (): User | null => {
  return auth.currentUser;
};
