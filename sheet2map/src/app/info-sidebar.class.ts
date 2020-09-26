export class InfoSidebar {
  private isOpened: boolean;

  constructor() {
    this.isOpened = this.IsOpened;
  }

  open(): void {
    this.isOpened = true;
  }

  close(): void {
    this.isOpened = false;
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
    console.log('class InfoSidebar toggle ', this.isOpened);
  }

  get IsOpened(): boolean {
    return this.isOpened;
  }

  set IsOpened(isOpened: boolean) {
    this.isOpened = isOpened;
  }
}
