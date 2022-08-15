import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  private readonly url = 'https://angular-course-168ed-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post(this.url + 'posts.json', postData).subscribe(responseData => { // HTTP requests are only sent if the subscribe function is called
      console.log(responseData);
    });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
