import { useRouter, useParams } from "next/navigation";

export function useNavigateApp() {
  const router = useRouter();
  const params = useParams();

  function navigate(url?: string) {
    if (url) {
      router.replace(url);
    }
  }

  return {
    navigate,
    params,
  };
}
