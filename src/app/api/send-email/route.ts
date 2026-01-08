// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Instantiate Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.EMAIL_TO_ADDRESS;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      eventDate, 
      eventType, 
      guestCount, 
      services, 
      message 
    } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }
    
    if (!toEmail) {
        console.error("EMAIL_TO_ADDRESS is not set in environment variables.");
        return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // Format services array for display
    const servicesText = services && services.length > 0 
      ? services.join(', ') 
      : 'Not specified';

    const { data, error } = await resend.emails.send({
      from: 'Heart & Hand Bookings <onboarding@resend.dev>',
      to: [toEmail],
      subject: `New Event Booking Request from ${name}`,
      replyTo: email, // Changed from reply_to to replyTo
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ea580c, #f97316); padding: 20px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Heart & Hand - New Booking Request</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <h2 style="color: #ea580c; margin-top: 0;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
                <td style="padding: 8px 0; color: #666;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #666;">${email}</td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #666;">${phone}</td>
              </tr>
              ` : ''}
            </table>

            <h2 style="color: #ea580c; margin-top: 30px;">Event Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${eventDate ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Event Date:</td>
                <td style="padding: 8px 0; color: #666;">${new Date(eventDate).toLocaleDateString('en-AU', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</td>
              </tr>
              ` : ''}
              ${eventType ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Event Type:</td>
                <td style="padding: 8px 0; color: #666;">${eventType}</td>
              </tr>
              ` : ''}
              ${guestCount ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Guest Count:</td>
                <td style="padding: 8px 0; color: #666;">${guestCount}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Services Requested:</td>
                <td style="padding: 8px 0; color: #666;">${servicesText}</td>
              </tr>
            </table>

            ${message ? `
            <h2 style="color: #ea580c; margin-top: 30px;">Additional Details</h2>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #ea580c;">
              <p style="margin: 0; color: #333; line-height: 1.5;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}

            <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px;">
              <p style="margin: 0; color: #856404; font-weight: bold;">📅 Remember to respond within 24 hours for the best customer experience!</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Booking request sent successfully!', data });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}