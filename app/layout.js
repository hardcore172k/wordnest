import './globals.css';

export const metadata = {
  title: 'WordNest Blog',
  description: 'Professional Blog Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdn.tailwindcss.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}