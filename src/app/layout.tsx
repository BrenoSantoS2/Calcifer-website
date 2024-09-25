export const metadata = {
  
  title: 'Calcifer Studios',
  description: 'Unleashing creativity and passion in every project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
