import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';

export interface WaitlistEntry {
  email: string;
  timestamp: any;
}

export interface DoctorApplication {
  email: string;
  fullName: string;
  specialty: string;
  licenseNumber: string;
  experience: string;
  timestamp: any;
  status: 'pending' | 'approved' | 'rejected';
}

export interface DoctorWaitlistEntry {
  name: string;
  surname: string;
  mobileNumber: string;
  licenseNumber: string;
  timestamp: any;
}

// Waitlist functions
export const addToWaitlist = async (email: string) => {
  try {
    console.log('Attempting to add to waitlist:', email);
    
    // Check if email already exists
    console.log('Checking for existing email...');
    const q = query(collection(db, 'waitlist'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.log('Email already exists in waitlist');
      return { success: false, error: 'Email already exists in waitlist' };
    }

    // Add to waitlist - simplified to just email and timestamp
    console.log('Adding to waitlist...');
    const docRef = await addDoc(collection(db, 'waitlist'), {
      email,
      timestamp: serverTimestamp()
    });

    console.log('Successfully added to waitlist:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error: error.message };
  }
};

export const getWaitlistCount = async (): Promise<number> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'waitlist'));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return 0;
  }
};

// Doctor application functions
export const submitDoctorApplication = async (applicationData: Omit<DoctorApplication, 'timestamp' | 'status'>) => {
  try {
    // Check if email already exists
    const q = query(collection(db, 'doctor_applications'), where('email', '==', applicationData.email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error('Application with this email already exists');
    }

    // Add doctor application
    const docRef = await addDoc(collection(db, 'doctor_applications'), {
      ...applicationData,
      timestamp: serverTimestamp(),
      status: 'pending'
    });

    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error submitting doctor application:', error);
    return { success: false, error: error.message };
  }
};

// Doctor waitlist function
export const addDoctorToWaitlist = async (doctorData: Omit<DoctorWaitlistEntry, 'timestamp'>) => {
  try {
    // Add to doctor waitlist
    const docRef = await addDoc(collection(db, 'waitlist'), {
      ...doctorData,
      timestamp: serverTimestamp(),
      type: 'doctor' // To distinguish from patient waitlist entries
    });

    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error adding doctor to waitlist:', error);
    return { success: false, error: error.message };
  }
};

// Get all waitlist entries (patients and doctors)
export const getAllWaitlistEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'waitlist'));
    const entries = querySnapshot.docs.map(doc => {
      const data = doc.data();
      let timestamp = new Date();
      
      // Handle different timestamp formats
      if (data.timestamp && typeof data.timestamp.toDate === 'function') {
        timestamp = data.timestamp.toDate();
      } else if (data.timestamp instanceof Date) {
        timestamp = data.timestamp;
      } else if (data.timestamp) {
        timestamp = new Date(data.timestamp);
      }
      
      return {
        id: doc.id,
        ...data,
        timestamp
      };
    });
    
    // Sort by timestamp (newest first)
    return entries.sort((a: any, b: any) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error getting waitlist entries:', error);
    return [];
  }
};

// Get patient waitlist entries only
export const getPatientWaitlistEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'waitlist'));
    const entries = querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        let timestamp = new Date();
        
        // Handle different timestamp formats
        if (data.timestamp && typeof data.timestamp.toDate === 'function') {
          timestamp = data.timestamp.toDate();
        } else if (data.timestamp instanceof Date) {
          timestamp = data.timestamp;
        } else if (data.timestamp) {
          timestamp = new Date(data.timestamp);
        }
        
        return {
          id: doc.id,
          ...data,
          timestamp
        };
      })
      .filter((entry: any) => !entry.type || entry.type === 'patient'); // No type field means patient
    
    // Sort by timestamp (newest first)
    return entries.sort((a: any, b: any) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error getting patient waitlist entries:', error);
    return [];
  }
};

// Get doctor waitlist entries only
export const getDoctorWaitlistEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'waitlist'));
    const entries = querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        let timestamp = new Date();
        
        // Handle different timestamp formats
        if (data.timestamp && typeof data.timestamp.toDate === 'function') {
          timestamp = data.timestamp.toDate();
        } else if (data.timestamp instanceof Date) {
          timestamp = data.timestamp;
        } else if (data.timestamp) {
          timestamp = new Date(data.timestamp);
        }
        
        return {
          id: doc.id,
          ...data,
          timestamp
        };
      })
      .filter((entry: any) => entry.type === 'doctor');
    
    // Sort by timestamp (newest first)
    return entries.sort((a: any, b: any) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error getting doctor waitlist entries:', error);
    return [];
  }
};

// Contact form function
export const submitContactForm = async (contactData: {
  name: string;
  email: string;
  message: string;
  subject?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'contact_forms'), {
      ...contactData,
      timestamp: serverTimestamp(),
      status: 'unread'
    });

    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
};

// Delete waitlist entry
export const deleteWaitlistEntry = async (entryId: string) => {
  try {
    await deleteDoc(doc(db, 'waitlist', entryId));
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting waitlist entry:', error);
    return { success: false, error: error.message };
  }
};
