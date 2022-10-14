import {
  animate,
  keyframes,
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
    trigger("list1", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      /* The "void" state is the undefined state, in which the object still does not exist. This state name
       * is a reserved keyword */
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)",
        }),
        animate(300),
      ]),
      transition("* => void", [
        style({
          opacity: 1,
          transform: "translateX(0)",
        }),
        animate(
          300,
          style({
            opacity: 0,
            transform: "translateX(100px)",
          })
        ),
      ]),
    ]),
    trigger("list2", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      /* The "void" state is the undefined state, in which the object still does not exist. This state name
       * is a reserved keyword */
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({
              transform: "translateX(-100px)",
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: "translateX(-20px)",
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: "translateX(0)",
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
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

  onDelete(item: string) {
    this.list = this.list.filter((value) => value !== item);
  }

  onAnimate() {
    this.state = this.state === "normal" ? "highlighted" : "normal";
    this.wildState = this.wildState === "normal" ? "highlighted" : "normal";
  }

  onShrink() {
    this.wildState = "shrunken";
  }
}
