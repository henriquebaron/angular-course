import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private readonly url =
    "https://angular-course-168ed-default-rtdb.firebaseio.com/";

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // Send Http request
    this.http
      .post<{ name: string }>(this.url + "posts.json", postData, {
        // This argument allows for better control on what to observe: the default would be "body".
        // Here, instead, I will request to observe the whole response (which contains the body).
        // observe: 'body'
        observe: "response",
      })
      .subscribe(
        (responseData) => {
          // HTTP requests are only sent if the subscribe function is called. Otherwise Angular considers that it's not
          // necessary to make the request, since "nobody's interested".
          console.log(responseData); // So, to keep it working like before, I would have to access the ".body" element of the response
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("print", "pretty");
    queryParams = queryParams.append("custom", "key"); // Several query parameters can be added this way (this second is just an example, has no effect)
    return this.http
      .get<{ [key: string]: Post }>(this.url + "posts.json", {
        headers: new HttpHeaders({ "Customer-Header": "Hello" }), // This allows to add any custom header that is needed
        // params: new HttpParams().set('print', 'pretty') // This is an alternative way to set the parameters directly.
        params: queryParams,
      })
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
        }),
        catchError((errorRes) => {
          // I could do any error processing here: log it to a server etc.
          return throwError(errorRes);
        })
      );
  }

  deleteAllPosts() {
    return this.http
      .delete(this.url + "posts.json", {
        // Here, I am subscribing to the events, which are being processed below.
        observe: "events",
      })
      .pipe(
        tap((event) => {
          // The tap operator allows to do something with the object on the pipe, but without altering it.
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
