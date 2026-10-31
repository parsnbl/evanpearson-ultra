const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

/**
 * Formats an ISO calendar date (YYYY-MM-DD) for display, independent of the viewer's time zone.
 * @param isoDate - Date string in YYYY-MM-DD form
 * @returns A human-readable date such as "October 30, 2026"
 * @throws {RangeError} If `isoDate` is not a valid date
 */
export function formatDisplayDate(isoDate: string): string {
  return DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`))
}
