import { waLink } from "@/lib/whatsapp";

export function WhatsAppButton({ message = "Hello Sharma Enterprises, I'd like to enquire about your products." }: { message?: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-105 active:scale-95"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.48c-.32-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.36-.26-.62-.52-.53-.71-.54l-.61-.01c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.4 5.39 4.77.75.32 1.34.52 1.79.66.75.24 1.44.21 1.98.13.6-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37zM16 3C8.82 3 3 8.82 3 16c0 2.29.6 4.44 1.65 6.3L3 29l6.92-1.62A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"/>
      </svg>
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
