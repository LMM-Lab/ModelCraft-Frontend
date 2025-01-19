export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en"  style={{ fontSize: '62.5%' }}>
      <body>
        {children}
      </body>
    </html>
  );
}
