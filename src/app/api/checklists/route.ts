import { NextRequest, NextResponse } from 'next/server';
import {
  getAllChecklists,
  getChecklistById,
  createChecklist,
  updateChecklist,
  deleteChecklist as deleteWordPressChecklist
} from '@/lib/wordpress';
import type { ChecklistItem } from '@/types/wordpress';

// GET - Fetch all checklists
export async function GET(request: NextRequest) {
  try {
    const checklists = await getAllChecklists();
    
    // Transform WordPress checklists to match expected format
    const transformedChecklists = checklists.map(checklist => {
      // Convert date from ISO format to YYYY-MM-DD format for date input
      let eventDate = checklist.checklistDetails?.eventDate || '';
      if (eventDate && eventDate.includes('T')) {
        eventDate = eventDate.split('T')[0];
      }
      
      return {
        id: checklist.databaseId.toString(),
        eventName: checklist.title,
        eventDate: eventDate,
        eventTimeStart: checklist.checklistDetails?.eventTimeStart || '',
        eventTimeEnd: checklist.checklistDetails?.eventTimeEnd || '',
        eventAddress: checklist.checklistDetails?.eventAddress || '',
        eventMapsLink: checklist.checklistDetails?.eventMapsLink || '',
        contactInfo: checklist.checklistDetails?.contactInfo || '',
        eventTheme: checklist.checklistDetails?.eventTheme || '',
        paymentStatus: checklist.checklistDetails?.paymentStatus || 'need_to_pay',
        items: (checklist.checklistDetails?.checklistItems || []).map((item, index) => ({
          id: `${checklist.databaseId}-${index}`,
          text: item.text,
          completed: item.completed,
          category: Array.isArray(item.category) ? item.category[0] : item.category
        })),
        lastModified: checklist.checklistDetails?.lastModified || checklist.modified
      };
    });
    
    return NextResponse.json({ checklists: transformedChecklists });
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
    
    console.log('Received checklist data:', JSON.stringify(checklistData, null, 2));
    
    // Validate required fields
    if (!checklistData.eventName || checklistData.eventName.trim() === '') {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      );
    }
    
    // If updating existing checklist
    if (checklistData.id && checklistData.id !== 'new' && !isNaN(parseInt(checklistData.id))) {
      console.log('Updating existing checklist with ID:', checklistData.id);
      
      const success = await updateChecklist({
        id: parseInt(checklistData.id),
        title: checklistData.eventName,
        eventDate: checklistData.eventDate || '',
        eventTimeStart: checklistData.eventTimeStart || '',
        eventTimeEnd: checklistData.eventTimeEnd || '',
        eventAddress: checklistData.eventAddress || '',
        eventMapsLink: checklistData.eventMapsLink || '',
        contactInfo: checklistData.contactInfo || '',
        eventTheme: checklistData.eventTheme || '',
        paymentStatus: checklistData.paymentStatus || 'need_to_pay',
        items: checklistData.items || []
      });
      
      if (success) {
        console.log('Successfully updated checklist');
        return NextResponse.json({
          success: true,
          checklist: checklistData
        });
      } else {
        throw new Error('Failed to update checklist in WordPress');
      }
    }
    
    // If creating new checklist
    console.log('Creating new checklist');
    const newId = await createChecklist({
      title: checklistData.eventName || 'New Checklist',
      eventDate: checklistData.eventDate || '',
      eventTimeStart: checklistData.eventTimeStart || '',
      eventTimeEnd: checklistData.eventTimeEnd || '',
      eventAddress: checklistData.eventAddress || '',
      eventMapsLink: checklistData.eventMapsLink || '',
      contactInfo: checklistData.contactInfo || '',
      eventTheme: checklistData.eventTheme || '',
      paymentStatus: checklistData.paymentStatus || 'need_to_pay',
      items: checklistData.items || []
    });
    
    if (newId) {
      console.log('Successfully created checklist with ID:', newId);
      return NextResponse.json({
        success: true,
        checklist: {
          ...checklistData,
          id: newId.toString()
        }
      });
    } else {
      throw new Error('Failed to create checklist in WordPress');
    }
  } catch (error: any) {
    console.error('Error saving checklist:', error);
    console.error('Stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to save checklist', message: error.message, details: error.toString() },
      { status: 500 }
    );
  }
}

// DELETE - Delete a checklist (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication and admin role
    const token = request.cookies.get('wp_auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate token and get user info
    const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    const userResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      );
    }

    const userData = await userResponse.json();
    
    // Check if user is an administrator
    if (!userData.roles?.includes('administrator')) {
      return NextResponse.json(
        { error: 'Administrator access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Checklist ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteWordPressChecklist(parseInt(id));
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error('Failed to delete checklist');
    }
  } catch (error) {
    console.error('Error deleting checklist:', error);
    return NextResponse.json(
      { error: 'Failed to delete checklist' },
      { status: 500 }
    );
  }
}
