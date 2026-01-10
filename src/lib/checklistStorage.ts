import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'checklists';

// Read all checklists from MongoDB
export async function readChecklists() {
  try {
    const { db } = await connectToDatabase();
    const checklists = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ lastModified: -1 })
      .toArray();
    
    // Convert MongoDB _id to string id
    return checklists.map((checklist) => ({
      ...checklist,
      id: checklist._id.toString(),
      _id: undefined,
    }));
  } catch (error) {
    console.error('Error reading checklists:', error);
    return [];
  }
}

// Get a single checklist by ID
export async function getChecklistById(id: string) {
  try {
    const { db } = await connectToDatabase();
    const checklist = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    
    if (!checklist) return null;
    
    return {
      ...checklist,
      id: checklist._id.toString(),
      _id: undefined,
    };
  } catch (error) {
    console.error('Error getting checklist:', error);
    return null;
  }
}

// Save or update a checklist
export async function saveChecklist(checklist: any) {
  try {
    const { db } = await connectToDatabase();
    checklist.lastModified = new Date().toISOString();
    
    // If updating existing checklist
    if (checklist.id && checklist.id !== 'new') {
      const { id, ...checklistData } = checklist;
      await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(id) },
        { $set: checklistData },
        { upsert: true }
      );
      return { ...checklistData, id };
    }
    
    // If creating new checklist
    const { id, ...checklistData } = checklist;
    const result = await db.collection(COLLECTION_NAME).insertOne(checklistData);
    return {
      ...checklistData,
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error('Error saving checklist:', error);
    throw error;
  }
}

// Delete a checklist
export async function deleteChecklist(id: string) {
  try {
    const { db } = await connectToDatabase();
    await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    return await readChecklists();
  } catch (error) {
    console.error('Error deleting checklist:', error);
    throw error;
  }
}
