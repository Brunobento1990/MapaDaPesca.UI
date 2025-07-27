import { AuthProvider } from "@/contexts/auth-context";
import "../globals.css";
import Layout from "@/layout/layout";

export default function RootLayoutPrivate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Layout titulo="Mapa da Pesca">{children}</Layout>
    </AuthProvider>
  );
}
