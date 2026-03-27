import { Icon } from "./icons";
import bStyles from "./BookingModal.module.scss"
import { useState,useMemo } from "react";
// ── Guest Search Dropdown ─────────────────────────────────
export const GuestSearchDropdown = ({ guests, selectedGuest, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredGuests = useMemo(() => {
    if (!searchTerm.trim()) return guests;
    const term = searchTerm.toLowerCase();
    return guests.filter(
      (guest) =>
        guest.name?.toLowerCase().includes(term) ||
        guest.email?.toLowerCase().includes(term) ||
        guest.phone?.includes(term)
    );
  }, [guests, searchTerm]);

  const handleSelect = (guest) => {
    onSelect(guest);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className={bStyles.guestSearchContainer}>
      <div className={bStyles.searchInputWrapper}>
        <Icon.Search />
        <input
          type="text"
          placeholder="Search guests by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={bStyles.searchInput}
        />
      </div>

      {isOpen && (
        <div className={bStyles.guestDropdown}>
          {filteredGuests.length > 0 ? (
            filteredGuests.map((guest) => (
              <div
                key={guest._id}
                className={`${bStyles.guestOption} ${
                  selectedGuest?._id === guest._id ? bStyles.guestOptionSelected : ""
                }`}
                onClick={() => handleSelect(guest)}
              >
                <div className={bStyles.guestOptionInfo}>
                  <span className={bStyles.guestOptionName}>{guest.name}</span>
                  <span className={bStyles.guestOptionContact}>
                    {guest.email || guest.phone}
                  </span>
                </div>
                {selectedGuest?._id === guest._id && (
                  <Icon.Check />
                )}
              </div>
            ))
          ) : (
            <div className={bStyles.noGuestsFound}>
              No guests found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}

      {selectedGuest && (
        <div className={bStyles.selectedGuestCard}>
          <div className={bStyles.selectedGuestInfo}>
            <Icon.User />
            <div>
              <span className={bStyles.selectedGuestName}>{selectedGuest.name}</span>
              <span className={bStyles.selectedGuestContact}>
                {selectedGuest.email || selectedGuest.phone}
              </span>
            </div>
          </div>
          <button
            type="button"
            className={bStyles.removeGuestBtn}
            onClick={() => onSelect(null)}
          >
            <Icon.Close />
          </button>
        </div>
      )}
    </div>
  );
};