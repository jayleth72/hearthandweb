import { NextRequest, NextResponse } from 'next/server';
import { readChecklists, saveChecklist, deleteChecklist } from '@/lib/checklistStorage';

// GET - Fetch all checklists
export async function GET(request: NextRequest) {
  try {
    const checklists = await readChecklists();
    return NextResponse.json({ checklists });
  } catch (error) {
    console.error('Error reading checklists:', error);
    return NextResponse.json(
      { error: 'Failed to read checklists', checklists: [] },
      { status: 500 }
    );
  }
}

// POST - Create or update a checklist
export async function POST(request: NextRequest) {
  let checklistData;
  
  try {
    checklistData = await request.json();
    const savedChecklist = await saveChecklist(checklistData);
    
    return NextResponse.json({
      success: true,
      checklist: savedChecklist
    });
  } catch (error: any) {
    console.error('Error saving checklist:', error);
    return NextResponse.json(
      { error: 'Failed to save checklist', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a checklist
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Checklist ID is required' },
        { status: 400 }
      );
    }

    await deleteChecklist(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting checklist:', error);
    return NextResponse.json(
      { error: 'Failed to delete checklist' },
      { status: 500 }
    );
  }
}
