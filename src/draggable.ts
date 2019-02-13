import { Vue, Component, Prop } from 'vue-property-decorator';
import { CreateElement } from 'vue';

interface Point {
  x: number;
  y: number;
}


// I took a lot of this code from my senior design project :)
@Component
export class DragElement extends Vue {
  @Prop({ type: String, default: 'div' }) public tag!: string;
  @Prop({ type: String, default: 'auto' }) public cursor!: string;

  public previous: Point | null = null;
  public moving = false;
  public in = false;

  public move(e: MouseEvent) {
    this.$emit('move', e);
  }

  public render(createElement: CreateElement) {
    return createElement(this.tag, {
      class: 'draggable',
      on: {
        mousedown: this.addListeners,
        mouseup: this.removeListeners,
        mouseenter: this.onHover,
        mouseleave: this.afterHover,
        click: (e: MouseEvent) => e.stopPropagation(),
      },
    }, this.$slots.default);
  }
  public mousemoveListener: (e: MouseEvent) => void = () => ({});

  public showCursor() {
    if (document.documentElement) {
      document.documentElement.style.cursor = this.cursor;
    }
  }

  public resetCursor() {
    if (document.documentElement) {
      document.documentElement.style.cursor = 'auto';
    }
  }

  public addListeners(e: MouseEvent, ...args: any[]) {
    if (e.which !== 1) { return; } // if not left click

    this.prevent(e);
    this.showCursor();
    this.moving = true;
    this.previous = { x: e.clientX, y: e.clientY };
    this.mousemoveListener = (event) => this.startMove(event, ...args);
    window.addEventListener('mousemove', this.mousemoveListener);
    window.addEventListener('mouseup', this.removeListeners);
  }

  public removeListeners(e?: MouseEvent) {
    if (e) { this.prevent(e); }

    this.resetCursor();
    this.previous = null;
    this.moving = false;
    window.removeEventListener('mousemove', this.mousemoveListener);
    window.removeEventListener('mouseup', this.removeListeners);
    this.mousemoveListener = () => ({});
    this.afterHover();
  }

  public startMove(e: MouseEvent, ...args: any[]) {
    if (!this.previous) {
      this.removeListeners();
      return;
    }

    this.prevent(e);
    // const changeY = e.clientY - this.previous.y;
    // const changeX = e.clientX - this.previous.x;

    this.previous = { x: e.clientX, y: e.clientY };
    this.$emit('move', e);
    // this.move(e, ...args, { changeY, changeX });
  }

  public prevent(e: Event) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (e && e.stopPropagation) { e.stopPropagation(); }
  }

  public onHover() {
    if (this.moving) { return; }
    this.in = true;
    this.showCursor();
  }

  public afterHover() {
    if (this.moving) { return; }
    this.in = false;
    this.resetCursor();
  }
}
