/**
 * BookingModalContext — provides a global openBooking() function
 * so any component in the tree can open the HubSpot scheduling modal
 * without prop drilling.
 */

import { createContext, useContext, useState, ReactNode } from "react";
import BookingModal from "@/components/BookingModal";

interface BookingModalContextValue {
  openBooking: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue>({
  openBooking: () => {},
});

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <BookingModalContext.Provider value={{ openBooking: () => setOpen(true) }}>
      {children}
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  return useContext(BookingModalContext);
}
