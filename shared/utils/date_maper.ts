export class DateMapper {
  /**
   * Formats a Date object to YYYY-MM-DD
   * ensuring local time is respected.
   */
  static toPersistence(date: Date): string {
    const year = date.getFullYear();
    // Month is 0-indexed
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  
  /**
   * Resets any Date object to 00:00:00
   */
  static toStartOfDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
}