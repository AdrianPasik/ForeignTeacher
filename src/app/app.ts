import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSelect } from "./frontend/language-select/language-select";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LanguageSelect],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ForeignTeacher');
}
