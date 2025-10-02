/** biome-ignore-all lint/complexity/useSimplifiedLogicExpression: <explanation> */
/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
'use server';

export async function submitForm(
  prevState: { message: string; success?: boolean; error?: string },
  formData: FormData
) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return {
      message: 'Please fill in all fields',
      success: false,
    };
  }

  if (!email.includes('@')) {
    return {
      message: 'Please enter a valid email address',
      success: false,
    };
  }

  // Process the form data (e.g., save to database, send email, etc.)
  console.log('[v0] Form submitted:', { name, email, phone, subject, message });

  return {
    message: `Thank you, ${name}! We'll contact you at ${email}.`,
    success: true,
  };
}