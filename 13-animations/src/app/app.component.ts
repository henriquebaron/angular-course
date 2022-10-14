import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px)",
        })
      ),
      // A double arrow defines the same animation for the transition in both directions
      transition("normal <=> highlighted", animate(300)),
      // transition('highlighted => normal', animate(800)),
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px)",
        })
      ),
      state(
        "shrunken",
        style({
          "background-color": "green",
          transform: "translateX(0) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      // The * wildcard character indicates 'any' state
      /* It is possible to add intermiediate style states during the transition animation.
       * In this case, it does not look great because the state changes abruptly at the end
       * of the animation time. */
      // transition('shrunken <=> *', animate(500, style({
      //   'border-radius': '50px'
      // }))),
      transition("shrunken <=> *", [
        style({
          "background-color": "orange",
          "border-radius": "0px",
        }),
        animate(
          1000,
          style({
            "border-radius": "50px",
          })
        ),
        animate(500),
      ]),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAdd(item) {
    this.list.push(item);
  }

  onAnimate() {
    this.state = this.state === "normal" ? "highlighted" : "normal";
    this.wildState = this.wildState === "normal" ? "highlighted" : "normal";
  }

  onShrink() {
    this.wildState = "shrunken";
  }
}
