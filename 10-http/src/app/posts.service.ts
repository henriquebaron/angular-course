import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private readonly url =
    "https://angular-course-168ed-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // Send Http request
    this.http
      .post<{ name: string }>(this.url + "posts.json", postData)
      .subscribe((responseData) => {
        // HTTP requests are only sent if the subscribe function is called. Otherwise Angular considers that it's not
        // necessary to make the request, since "nobody's interested".
        console.log(responseData);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(this.url + "posts.json")
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              // ... is the "spread operator". It spreads all the elements of the element from "responseData", in this case, "title" and "content"
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      );
  }

  deleteAllPosts() {
    return this.http.delete(this.url + "posts.json");
  }
}
