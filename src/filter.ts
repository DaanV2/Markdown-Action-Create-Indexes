import { PicomatchOptions, isMatch } from "picomatch";

export class FileFilter {
  private include: string[];
  private exclude: string[];
  private opts: PicomatchOptions;

  /**
   * Creates a new FileFilter.
   * @param include The patterns to include, addeds *.md by default.
   * @param exclude The patterns to exclude.
   */
  constructor(include: string[], exclude: string[]) {
    this.include = include;
    this.exclude = exclude;

    this.opts = {
      contains: true,
    };
  }

  /**
   * Checks if the file is a match, and not excluded
   * @param filename The filename to check
   * @returns true if the file is a match, false otherwise
   */
  public isMatch(filename: string): boolean {
    return this.included(filename) && !this.excluded(filename);
  }

  /**
   * Checks if the file is included
   * @param filename The filepath to check
   * @returns true if the file is included, false otherwise
   */
  included(filename: string): boolean {
    return this.include.some((pattern) =>
      isMatch(filename, pattern, this.opts)
    );
  }

  /**
   * Checks if the file is excluded
   * @param filename The filepath to check
   * @returns true if the file is excluded, false otherwise
   */
  excluded(filename: string): boolean {
    return this.exclude.some((pattern) =>
      isMatch(filename, pattern, this.opts)
    );
  }
}
