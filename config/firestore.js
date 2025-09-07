import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Add a new status to the feed
export const addStatus = async (content, authorId, authorEmail) => {
  try {
    const docRef = await addDoc(collection(db, 'statuses'), {
      content: content,
      authorId: authorId,
      authorEmail: authorEmail,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Listen to real-time updates of the status feed
export const subscribeToStatuses = (callback) => {
  const q = query(
    collection(db, 'statuses'), 
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const statuses = [];
    querySnapshot.forEach((doc) => {
      statuses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(statuses);
  }, (error) => {
    console.error('Error listening to statuses:', error);
    callback([], error);
  });
};

// Format timestamp for display
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Just now';
  
  const now = new Date();
  const postTime = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const diffInSeconds = Math.floor((now - postTime) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};
